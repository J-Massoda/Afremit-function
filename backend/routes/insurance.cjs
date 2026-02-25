const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path');

// Multer storage for subscription ID uploads (public - used during subscription flow)
const idStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../../uploads/kyc')),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g,'-')}`)
});
const idUpload = multer({
  storage: idStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|pdf/;
    const ok = allowed.test(path.extname(file.originalname).toLowerCase()) && allowed.test(file.mimetype);
    if (ok) cb(null, true); else cb(new Error('Only .png, .jpg, .jpeg and .pdf files are allowed'));
  }
});

// Mock database
let subscriptions = [];
let payments = [];

// Insurance plans data
const plans = [
  {
    id: 'funeral-repatriation',
    name: 'Funeral & Repatriation Plan',
    tagline: 'Complete funeral cover with repatriation',
    monthlyPremium: 25,
    icon: '🛡️',
    popular: true,
    coverageSummary: 'Complete funeral cover with repatriation from South Africa',
    waitingPeriod: '6 months for natural death',
    benefits: [
      'Funeral arrangements and costs covered',
      'Repatriation from South Africa',
      'Spouse + up to 6 children covered',
      'Chema & Nhaka allowance',
      'Hearse and casket provided',
      'Documentation support'
    ],
    coverageLimits: {
      mainMember: 10000,
      spouse: 8000,
      children: 5000
    }
  },
  {
    id: 'worldwide-funeral',
    name: 'Worldwide Funeral Plan',
    tagline: 'Global coverage with international repatriation',
    monthlyPremium: 45,
    icon: '✈️',
    popular: false,
    coverageSummary: 'Worldwide repatriation and international funeral coverage',
    waitingPeriod: '3 months for natural death',
    benefits: [
      'Worldwide repatriation included',
      'International funeral coverage',
      'Family coverage included',
      'Emergency assistance 24/7',
      'Multiple country support',
      'Premium funeral services'
    ],
    coverageLimits: {
      mainMember: 15000,
      spouse: 12000,
      children: 8000
    }
  },
  {
    id: 'accidental-death',
    name: 'Accidental Death Cover',
    tagline: 'Immediate protection for accidents',
    monthlyPremium: 15,
    icon: '🚑',
    popular: false,
    coverageSummary: 'Immediate accidental death coverage with no waiting period',
    waitingPeriod: 'No waiting period',
    benefits: [
      'Accidental death coverage only',
      'Immediate cover - no waiting period',
      'Low monthly premium',
      'Lump sum payout',
      'Simple benefits',
      'Fast claim processing'
    ],
    coverageLimits: {
      mainMember: 20000,
      spouse: 0,
      children: 0
    }
  }
];

// Get all insurance plans (core)
router.get('/plans', (req, res) => {
  res.json({ success: true, data: plans });
});

// Get single plan by ID
router.get('/plans/:planId', (req, res) => {
  const { planId } = req.params;
  const plan = plans.find(p => p.id === planId);
  if (!plan) {
    return res.status(404).json({ success: false, message: 'Plan not found' });
  }
  res.json({ success: true, data: plan });
});

// Create new subscription
router.post('/subscriptions', (req, res) => {
  const subscriptionData = req.body;
  if (!subscriptionData.planId || !subscriptionData.personalDetails) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const plan = plans.find(p => p.id === subscriptionData.planId);
  const planName = plan ? plan.name : (subscriptionData.planName || subscriptionData.planId);
  const monthlyPremium = plan ? plan.monthlyPremium : (subscriptionData.monthlyPremium || 0);

  const policyReference = `ZP-${Date.now().toString().slice(-8)}`;
  const subscription = {
    id: uuidv4(),
    policyReference,
    planId: subscriptionData.planId,
    planName,
    monthlyPremium,
    personalDetails: subscriptionData.personalDetails,
    beneficiaryDetails: subscriptionData.beneficiaryDetails,
    status: 'PENDING_PAYMENT',
    createdAt: new Date().toISOString(),
    startDate: null
  };

  subscriptions.push(subscription);
  res.status(201).json({ success: true, data: subscription });
});

// Upload ID / Passport image for a subscription (public during onboarding)
router.post('/subscriptions/:subscriptionId/upload-id', idUpload.single('idDocument'), (req, res) => {
  const { subscriptionId } = req.params;
  const subscription = subscriptions.find(s => s.id === subscriptionId);
  if (!subscription) return res.status(404).json({ success: false, message: 'Subscription not found' });
  if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
  subscription.personalDetails = subscription.personalDetails || {};
  subscription.personalDetails.idDocumentPath = `/uploads/kyc/${req.file.filename}`;
  subscription.updatedAt = new Date().toISOString();
  res.json({ success: true, message: 'ID uploaded', path: subscription.personalDetails.idDocumentPath });
});

// Process payment (mock)
router.post('/payments', (req, res) => {
  const paymentData = req.body;
  if (!paymentData.subscriptionId || !paymentData.paymentMethod || !paymentData.amount) {
    return res.status(400).json({ success: false, message: 'Missing required payment fields' });
  }
  const subscription = subscriptions.find(s => s.id === paymentData.subscriptionId);
  if (!subscription) return res.status(404).json({ success: false, message: 'Subscription not found' });

  setTimeout(() => {
    const isSuccess = Math.random() > 0.1;
    const payment = {
      id: uuidv4(),
      subscriptionId: paymentData.subscriptionId,
      policyReference: subscription.policyReference,
      amount: paymentData.amount,
      paymentMethod: paymentData.paymentMethod,
      status: isSuccess ? 'SUCCESS' : 'FAILED',
      transactionId: `TXN-${Date.now()}`,
      processedAt: new Date().toISOString()
    };
    payments.push(payment);
    if (isSuccess) {
      subscription.status = 'ACTIVE';
      subscription.startDate = new Date().toISOString();
      subscription.nextBillingDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    }
    res.json({ success: true, data: payment });
  }, 1200);
});

// Basic retrieve endpoints
router.get('/subscriptions/:policyReference', (req, res) => {
  const { policyReference } = req.params;
  const subscription = subscriptions.find(s => s.policyReference === policyReference);
  if (!subscription) return res.status(404).json({ success: false, message: 'Subscription not found' });
  res.json({ success: true, data: subscription });
});

router.get('/payments/:subscriptionId', (req, res) => {
  const { subscriptionId } = req.params;
  const subscriptionPayments = payments.filter(p => p.subscriptionId === subscriptionId);
  res.json({ success: true, data: subscriptionPayments });
});

module.exports = router;