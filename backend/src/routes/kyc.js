import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import path from 'path';
import { 
  users, 
  providers, 
  kycRecords, 
  USER_STATES, 
  PROVIDER_STATES, 
  KYC_STATUS 
} from '../models/database.js';
import { 
  authenticateToken, 
  requireRole, 
  requireEmailVerified 
} from '../middlewares/auth.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOAD_PATH || './uploads/kyc/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024 }, // 5MB default
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only .png, .jpg, .jpeg, and .pdf files are allowed!'));
  }
});

// ========== CLIENT KYC ==========

// Submit User KYC
router.post('/user', 
  authenticateToken, 
  requireRole('client'), 
  requireEmailVerified,
  upload.fields([
    { name: 'idDocument', maxCount: 1 },
    { name: 'proofOfIdentity', maxCount: 1 }
  ]),
  (req, res) => {
    try {
      const { fullName, dateOfBirth, country, idNumber } = req.body;
      const userId = req.user.id;

      // Validation
      if (!fullName || !dateOfBirth || !country || !idNumber) {
        return res.status(400).json({ 
          message: 'Full name, date of birth, country, and ID number required' 
        });
      }

      if (!req.files.idDocument || !req.files.proofOfIdentity) {
        return res.status(400).json({ 
          message: 'Both ID document and proof of identity are required' 
        });
      }

      // Check if KYC already exists
      const existingKyc = kycRecords.find(k => k.userId === userId && k.userType === 'client');
      if (existingKyc && existingKyc.status === KYC_STATUS.APPROVED) {
        return res.status(400).json({ message: 'KYC already approved' });
      }

      if (existingKyc && existingKyc.status === KYC_STATUS.PENDING) {
        return res.status(400).json({ message: 'KYC already submitted and under review' });
      }

      const kycRecord = {
        id: uuidv4(),
        userId,
        userType: 'client',
        fullName,
        dateOfBirth,
        country,
        idNumber,
        idDocument: `/uploads/kyc/${req.files.idDocument[0].filename}`,
        proofOfIdentity: `/uploads/kyc/${req.files.proofOfIdentity[0].filename}`,
        status: KYC_STATUS.PENDING,
        submittedAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };

      // Remove old rejected KYC if exists
      const oldKycIndex = kycRecords.findIndex(k => k.userId === userId && k.userType === 'client');
      if (oldKycIndex !== -1) {
        kycRecords.splice(oldKycIndex, 1);
      }

      kycRecords.push(kycRecord);

      // Update user state
      const user = users.find(u => u.id === userId);
      if (user) {
        user.state = USER_STATES.KYC_PENDING;
        user.updatedAt = new Date().toISOString();
      }

      res.status(201).json({
        message: 'KYC submitted successfully. Under admin review.',
        kycId: kycRecord.id,
        status: KYC_STATUS.PENDING
      });
    } catch (error) {
      console.error('KYC submission error:', error);
      res.status(500).json({ message: 'KYC submission failed', error: error.message });
    }
  }
);

// ========== PROVIDER KYC ==========

// Submit Provider KYC
router.post('/provider',
  authenticateToken,
  requireRole('provider'),
  requireEmailVerified,
  upload.fields([
    { name: 'businessRegistrationDoc', maxCount: 1 },
    { name: 'directorId', maxCount: 1 },
    { name: 'proofOfAddress', maxCount: 1 }
  ]),
  (req, res) => {
    try {
      const { 
        businessName, 
        businessRegistration, 
        taxNumber,
        serviceCategory,
        operatingLocations,
        bio,
        services
      } = req.body;

      const providerId = req.user.id;

      // Validation
      if (!businessName || !businessRegistration || !serviceCategory) {
        return res.status(400).json({ 
          message: 'Business name, registration, and service category required' 
        });
      }

      if (!req.files.businessRegistrationDoc || !req.files.directorId || !req.files.proofOfAddress) {
        return res.status(400).json({ 
          message: 'All documents required: business registration, director ID, proof of address' 
        });
      }

      // Check if KYC already exists
      const existingKyc = kycRecords.find(k => k.userId === providerId && k.userType === 'provider');
      if (existingKyc && existingKyc.status === KYC_STATUS.APPROVED) {
        return res.status(400).json({ message: 'KYC already approved' });
      }

      if (existingKyc && existingKyc.status === KYC_STATUS.PENDING) {
        return res.status(400).json({ message: 'KYC already submitted and under review' });
      }

      const kycRecord = {
        id: uuidv4(),
        userId: providerId,
        userType: 'provider',
        businessName,
        businessRegistration,
        taxNumber: taxNumber || null,
        businessRegistrationDoc: `/uploads/kyc/${req.files.businessRegistrationDoc[0].filename}`,
        directorId: `/uploads/kyc/${req.files.directorId[0].filename}`,
        proofOfAddress: `/uploads/kyc/${req.files.proofOfAddress[0].filename}`,
        serviceCategory,
        operatingLocations: typeof operatingLocations === 'string' 
          ? JSON.parse(operatingLocations) 
          : operatingLocations,
        status: KYC_STATUS.PENDING,
        submittedAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };

      // Remove old rejected KYC if exists
      const oldKycIndex = kycRecords.findIndex(k => k.userId === providerId && k.userType === 'provider');
      if (oldKycIndex !== -1) {
        kycRecords.splice(oldKycIndex, 1);
      }

      kycRecords.push(kycRecord);

      // Update provider state and details
      const provider = providers.find(p => p.id === providerId);
      if (provider) {
        provider.state = PROVIDER_STATES.KYC_REVIEW;
        provider.businessName = businessName;
        provider.businessRegistration = businessRegistration;
        provider.serviceCategory = serviceCategory;
        provider.operatingLocations = kycRecord.operatingLocations;
        provider.bio = bio || null;
        provider.services = typeof services === 'string' ? JSON.parse(services) : services || [];
        provider.updatedAt = new Date().toISOString();
      }

      res.status(201).json({
        message: 'Provider KYC submitted successfully. Under admin review.',
        kycId: kycRecord.id,
        status: KYC_STATUS.PENDING
      });
    } catch (error) {
      console.error('Provider KYC submission error:', error);
      res.status(500).json({ message: 'KYC submission failed', error: error.message });
    }
  }
);

// ========== CHECK KYC STATUS ==========

// Get KYC status
router.get('/status', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    const userType = req.user.role === 'provider' ? 'provider' : 'client';

    const kyc = kycRecords.find(k => k.userId === userId && k.userType === userType);

    if (!kyc) {
      return res.json({
        hasSubmitted: false,
        status: null,
        message: 'No KYC submission found'
      });
    }

    // Remove sensitive file paths from response
    const { businessRegistrationDoc, directorId, proofOfAddress, idDocument, proofOfIdentity, ...safeKyc } = kyc;

    res.json({
      hasSubmitted: true,
      kyc: safeKyc
    });
  } catch (error) {
    console.error('KYC status error:', error);
    res.status(500).json({ message: 'Failed to fetch KYC status', error: error.message });
  }
});

export default router;
