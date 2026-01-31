import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import contractRoutes from './routes/contracts.js';
import userRoutes from './routes/users.js';
import milestoneRoutes from './routes/milestones.js';
import paymentRoutes from './routes/payments.js';
import insuranceRoutes from '../routes/insurance.js';
import kycRoutes from './routes/kyc.js';
import adminRoutes from './routes/admin.js';
import constructionRoutes from './routes/construction.js';
import providersRoutes from './routes/providers.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files (for MVP - in production use cloud storage)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Create uploads directory if it doesn't exist
import fs from 'fs';
const uploadsDir = path.join(__dirname, '../uploads/kyc');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/kyc', kycRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/providers', providersRoutes);
app.use('/api/construction', constructionRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/users', userRoutes);
app.use('/api/milestones', milestoneRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/insurance', insuranceRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Afremit API is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  
  // Multer file upload errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ 
      message: 'File too large',
      maxSize: '5MB'
    });
  }

  if (err.message && err.message.includes('Only .png')) {
    return res.status(400).json({ message: err.message });
  }

  res.status(err.status || 500).json({ 
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Afremit Backend Server Running`);
  console.log(`   Port: ${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
  console.log(`   API Base: http://localhost:${PORT}/api`);
  console.log(`\n📡 Available Routes:`);
  console.log(`   POST /api/auth/login`);
  console.log(`   POST /api/auth/signup`);
  console.log(`   POST /api/auth/provider/apply`);
  console.log(`   GET  /api/auth/verify-email/:token`);
  console.log(`   POST /api/kyc/user (with file upload)`);
  console.log(`   POST /api/kyc/provider (with file upload)`);
  console.log(`   GET  /api/admin/kyc/pending`);
  console.log(`   POST /api/admin/kyc/:kycId/approve`);
  console.log(`   POST /api/admin/milestones/:id/approve`);
  console.log(`   GET  /api/insurance/plans`);
  console.log(`\n`);
});
