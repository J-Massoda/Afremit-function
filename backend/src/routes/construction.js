import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import path from 'path';
import {
  users,
  providers,
  quotes,
  quoteResponses,
  contracts,
  milestones,
  escrowLedger,
  USER_STATES,
  PROVIDER_STATES,
  CONTRACT_STATUS,
  MILESTONE_STATUS,
  ESCROW_STATUS
} from '../models/database.js';
import {
  authenticateToken,
  requireRole,
  requireUserState,
  requireProviderState
} from '../middlewares/auth.js';

const router = express.Router();

// Configure multer for construction documents
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = req.baseUrl.includes('quotes') ? 'quotes' : 'responses';
    cb(null, `./uploads/${type}/`);
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) return cb(null, true);
    cb(new Error('Only images and PDFs allowed'));
  }
});

// ========== CLIENT: REQUEST QUOTE ==========

// Submit construction quote request
router.post('/request-quote',
  authenticateToken,
  requireRole('client'),
  requireUserState(USER_STATES.VERIFIED),
  upload.fields([
    { name: 'blueprints', maxCount: 5 },
    { name: 'referenceImages', maxCount: 10 }
  ]),
  (req, res) => {
    try {
      const {
        constructionType,
        budgetRange,
        duration,
        location,
        landDetails,
        requestSurveyor,
        proposedMilestones
      } = req.body;

      const userId = req.user.id;

      // Validation
      if (!constructionType || !budgetRange || !duration || !location) {
        return res.status(400).json({
          message: 'Construction type, budget, duration, and location required'
        });
      }

      // Parse milestones
      const parsedMilestones = typeof proposedMilestones === 'string'
        ? JSON.parse(proposedMilestones)
        : proposedMilestones || [];

      // Process uploaded files
      const blueprints = req.files.blueprints?.map(f => `/uploads/quotes/${f.filename}`) || [];
      const referenceImages = req.files.referenceImages?.map(f => `/uploads/quotes/${f.filename}`) || [];

      const quote = {
        id: uuidv4(),
        userId,
        serviceType: 'construction',
        constructionType,
        budgetRange,
        duration,
        location,
        landDetails: landDetails || null,
        blueprints,
        referenceImages,
        requestSurveyor: requestSurveyor === 'true' || requestSurveyor === true,
        proposedMilestones: parsedMilestones,
        status: 'open',
        responses: [],
        createdAt: new Date().toISOString()
      };

      quotes.push(quote);

      res.status(201).json({
        message: 'Quote request submitted successfully',
        quoteId: quote.id,
        quote
      });
    } catch (error) {
      console.error('Request quote error:', error);
      res.status(500).json({ message: 'Failed to submit quote', error: error.message });
    }
  }
);

// Get user's quotes
router.get('/my-quotes', 
  authenticateToken,
  requireRole('client'),
  (req, res) => {
    try {
      const userId = req.user.id;
      const userQuotes = quotes.filter(q => q.userId === userId);

      // Attach response count
      const enriched = userQuotes.map(q => ({
        ...q,
        responseCount: q.responses.length
      }));

      res.json({
        count: enriched.length,
        quotes: enriched
      });
    } catch (error) {
      console.error('Get quotes error:', error);
      res.status(500).json({ message: 'Failed to fetch quotes', error: error.message });
    }
  }
);

// Get quote details with responses
router.get('/quotes/:quoteId',
  authenticateToken,
  (req, res) => {
    try {
      const { quoteId } = req.params;
      const quote = quotes.find(q => q.id === quoteId);

      if (!quote) {
        return res.status(404).json({ message: 'Quote not found' });
      }

      // Check authorization
      if (req.user.role === 'client' && quote.userId !== req.user.id) {
        return res.status(403).json({ message: 'Access denied' });
      }

      // Get responses
      const responses = quoteResponses.filter(qr => qr.quoteId === quoteId);

      // Enrich responses with provider details
      const enrichedResponses = responses.map(response => {
        const provider = providers.find(p => p.id === response.providerId);
        return {
          ...response,
          provider: {
            id: provider?.id,
            businessName: provider?.businessName,
            rating: provider?.rating,
            completedContracts: provider?.completedContracts,
            verified: provider?.verified
          }
        };
      });

      res.json({
        quote,
        responses: enrichedResponses
      });
    } catch (error) {
      console.error('Get quote details error:', error);
      res.status(500).json({ message: 'Failed to fetch quote', error: error.message });
    }
  }
);

// ========== PROVIDER: BROWSE & RESPOND ==========

// Browse available quotes (providers only)
router.get('/available-quotes',
  authenticateToken,
  requireRole('provider'),
  requireProviderState(PROVIDER_STATES.PUBLISHED),
  (req, res) => {
    try {
      const { serviceCategory } = req.query;

      let available = quotes.filter(q => q.status === 'open' && q.serviceType === 'construction');

      // Filter by provider's service category if needed
      if (serviceCategory) {
        available = available.filter(q => 
          q.constructionType.toLowerCase().includes(serviceCategory.toLowerCase())
        );
      }

      // Remove user contact info
      const safe = available.map(q => {
        const { userId, ...safeQuote } = q;
        return {
          ...safeQuote,
          clientVerified: true // Only verified users can request quotes
        };
      });

      res.json({
        count: safe.length,
        quotes: safe
      });
    } catch (error) {
      console.error('Get available quotes error:', error);
      res.status(500).json({ message: 'Failed to fetch quotes', error: error.message });
    }
  }
);

// Submit quote response
router.post('/quote-response',
  authenticateToken,
  requireRole('provider'),
  requireProviderState(PROVIDER_STATES.PUBLISHED),
  upload.single('constructionPlan'),
  (req, res) => {
    try {
      const {
        quoteId,
        totalCost,
        timeline,
        recommendedMilestones,
        message
      } = req.body;

      const providerId = req.user.id;

      // Validation
      if (!quoteId || !totalCost || !timeline || !recommendedMilestones) {
        return res.status(400).json({
          message: 'Quote ID, total cost, timeline, and milestones required'
        });
      }

      const quote = quotes.find(q => q.id === quoteId);

      if (!quote) {
        return res.status(404).json({ message: 'Quote not found' });
      }

      if (quote.status !== 'open') {
        return res.status(400).json({ message: 'Quote is no longer accepting responses' });
      }

      // Check if provider already responded
      const existingResponse = quoteResponses.find(
        qr => qr.quoteId === quoteId && qr.providerId === providerId
      );

      if (existingResponse) {
        return res.status(400).json({ message: 'You have already responded to this quote' });
      }

      // Parse milestones
      const parsedMilestones = typeof recommendedMilestones === 'string'
        ? JSON.parse(recommendedMilestones)
        : recommendedMilestones;

      const response = {
        id: uuidv4(),
        quoteId,
        providerId,
        totalCost: parseFloat(totalCost),
        timeline,
        recommendedMilestones: parsedMilestones,
        constructionPlan: req.file ? `/uploads/responses/${req.file.filename}` : null,
        message: message || null,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      quoteResponses.push(response);

      // Add response ID to quote
      quote.responses.push(response.id);

      res.status(201).json({
        message: 'Quote response submitted successfully',
        responseId: response.id,
        response
      });
    } catch (error) {
      console.error('Quote response error:', error);
      res.status(500).json({ message: 'Failed to submit response', error: error.message });
    }
  }
);

// ========== CLIENT: ACCEPT QUOTE & CREATE CONTRACT ==========

// Accept quote response (creates contract)
router.post('/accept-response/:responseId',
  authenticateToken,
  requireRole('client'),
  requireUserState(USER_STATES.VERIFIED),
  (req, res) => {
    try {
      const { responseId } = req.params;
      const userId = req.user.id;

      const response = quoteResponses.find(qr => qr.id === responseId);

      if (!response) {
        return res.status(404).json({ message: 'Quote response not found' });
      }

      const quote = quotes.find(q => q.id === response.quoteId);

      if (!quote || quote.userId !== userId) {
        return res.status(403).json({ message: 'Access denied' });
      }

      if (response.status !== 'pending') {
        return res.status(400).json({ 
          message: `Response already ${response.status}` 
        });
      }

      // Update response status
      response.status = 'accepted';
      response.acceptedAt = new Date().toISOString();

      // Close quote
      quote.status = 'closed';

      // Create contract
      const contract = {
        id: uuidv4(),
        quoteId: quote.id,
        quoteResponseId: response.id,
        clientId: userId,
        providerId: response.providerId,
        title: `${quote.constructionType} - ${quote.location}`,
        description: quote.landDetails || quote.constructionType,
        totalAmount: response.totalCost,
        escrowBalance: response.totalCost, // All funds held in escrow
        releasedAmount: 0,
        status: CONTRACT_STATUS.PENDING_ACCEPTANCE,
        expectedEndDate: new Date(Date.now() + parseTimeline(response.timeline)).toISOString(),
        acceptedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      contracts.push(contract);

      // Create milestones from recommended milestones
      const contractMilestones = response.recommendedMilestones.map((m, index) => ({
        id: uuidv4(),
        contractId: contract.id,
        title: m.title,
        description: m.description || '',
        amount: m.amount,
        order: m.order || index + 1,
        status: MILESTONE_STATUS.PENDING,
        createdAt: new Date().toISOString()
      }));

      milestones.push(...contractMilestones);

      // Create escrow entries for each milestone
      const escrowEntries = contractMilestones.map(m => ({
        id: uuidv4(),
        contractId: contract.id,
        milestoneId: m.id,
        amount: m.amount,
        status: ESCROW_STATUS.HELD,
        heldAt: new Date().toISOString()
      }));

      escrowLedger.push(...escrowEntries);

      res.status(201).json({
        message: 'Contract created successfully. Funds held in escrow.',
        contract: {
          id: contract.id,
          title: contract.title,
          totalAmount: contract.totalAmount,
          status: contract.status
        },
        milestones: contractMilestones.map(m => ({
          id: m.id,
          title: m.title,
          amount: m.amount,
          order: m.order
        }))
      });
    } catch (error) {
      console.error('Accept response error:', error);
      res.status(500).json({ message: 'Failed to accept response', error: error.message });
    }
  }
);

// Helper: Parse timeline string to milliseconds
function parseTimeline(timeline) {
  const match = timeline.match(/(\d+)\s*(month|months|week|weeks|day|days)/i);
  if (!match) return 180 * 24 * 60 * 60 * 1000; // Default 6 months

  const value = parseInt(match[1]);
  const unit = match[2].toLowerCase();

  if (unit.includes('month')) return value * 30 * 24 * 60 * 60 * 1000;
  if (unit.includes('week')) return value * 7 * 24 * 60 * 60 * 1000;
  if (unit.includes('day')) return value * 24 * 60 * 60 * 1000;

  return 180 * 24 * 60 * 60 * 1000;
}

export default router;
