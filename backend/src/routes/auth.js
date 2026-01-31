import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { users, providers, USER_STATES, PROVIDER_STATES } from '../models/database.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'afremit-demo-secret-key-2026';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Helper: Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      role: user.role,
      name: user.name
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

// Helper: Generate email verification token
const generateVerificationToken = () => {
  return uuidv4();
};

// Helper: Send verification email (mocked for MVP)
const sendVerificationEmail = (email, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-email?token=${token}`;
  console.log(`📧 [MOCK] Verification email sent to ${email}`);
  console.log(`   Verification URL: ${verificationUrl}`);
  // In production: use nodemailer to send actual email
  return true;
};

// ========== PUBLIC ROUTES ==========

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    // Find user in both users and providers
    let user = users.find(u => u.email === email);
    let isProvider = false;

    if (!user) {
      user = providers.find(p => p.email === email);
      isProvider = true;
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if suspended
    if (user.state === 'SUSPENDED') {
      return res.status(403).json({ message: 'Account suspended. Contact support.' });
    }

    // Generate token
    const token = generateToken(user);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Login successful',
      token,
      user: userWithoutPassword,
      requiresEmailVerification: !user.emailVerified,
      requiresKYC: isProvider 
        ? user.state === PROVIDER_STATES.APPLIED 
        : user.state === USER_STATES.REGISTERED || user.state === USER_STATES.EMAIL_VERIFIED
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

// Sign up (Client)
// Sign up (Client)
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, phone, country } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    if (users.find(u => u.email === email) || providers.find(p => p.email === email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = generateVerificationToken();

    const newUser = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      role: 'client',
      phone: phone || null,
      country: country || null,
      state: USER_STATES.REGISTERED,
      emailVerified: false,
      emailVerificationToken: verificationToken,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    users.push(newUser);

    // Send verification email
    sendVerificationEmail(email, verificationToken);

    const { password: _, emailVerificationToken: __, ...userWithoutPassword } = newUser;
    const token = generateToken(newUser);

    res.status(201).json({
      message: 'Account created successfully. Please verify your email.',
      token,
      user: userWithoutPassword,
      requiresEmailVerification: true
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// Provider Application (Sign up as provider)
router.post('/provider/apply', async (req, res) => {
  try {
    const { name, email, password, phone, country, businessName, serviceCategory } = req.body;

    // Validation
    if (!name || !email || !password || !businessName || !serviceCategory) {
      return res.status(400).json({ 
        message: 'Name, email, password, business name, and service category required' 
      });
    }

    // Check if already exists
    if (users.find(u => u.email === email) || providers.find(p => p.email === email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = generateVerificationToken();

    const newProvider = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      role: 'provider',
      phone: phone || null,
      country: country || null,
      businessName,
      serviceCategory,
      state: PROVIDER_STATES.APPLIED,
      verified: false,
      verifiedBadge: false,
      rating: 0,
      completedContracts: 0,
      emailVerified: false,
      emailVerificationToken: verificationToken,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    providers.push(newProvider);

    // Send verification email
    sendVerificationEmail(email, verificationToken);

    const { password: _, emailVerificationToken: __, ...providerWithoutPassword } = newProvider;
    const token = generateToken(newProvider);

    res.status(201).json({
      message: 'Provider application submitted. Please verify your email and complete KYC.',
      token,
      user: providerWithoutPassword,
      requiresEmailVerification: true,
      requiresKYC: true
    });
  } catch (error) {
    console.error('Provider application error:', error);
    res.status(500).json({ message: 'Application failed', error: error.message });
  }
});

// Verify Email
router.get('/verify-email/:token', (req, res) => {
  try {
    const { token } = req.params;

    // Find user with this token
    let user = users.find(u => u.emailVerificationToken === token);
    let isProvider = false;

    if (!user) {
      user = providers.find(p => p.emailVerificationToken === token);
      isProvider = true;
    }

    if (!user) {
      return res.status(404).json({ message: 'Invalid or expired verification token' });
    }

    if (user.emailVerified) {
      return res.status(400).json({ message: 'Email already verified' });
    }

    // Update user
    user.emailVerified = true;
    user.emailVerificationToken = null;
    user.updatedAt = new Date().toISOString();

    // Update state
    if (isProvider) {
      user.state = PROVIDER_STATES.DOCUMENTS_SUBMITTED; // Ready for KYC
    } else {
      user.state = USER_STATES.EMAIL_VERIFIED; // Ready for KYC
    }

    res.json({
      message: 'Email verified successfully!',
      nextStep: 'Please complete KYC verification'
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ message: 'Verification failed', error: error.message });
  }
});

// Resend Verification Email
router.post('/resend-verification', authenticateToken, (req, res) => {
  try {
    let user = users.find(u => u.id === req.user.id);
    let isProvider = false;

    if (!user) {
      user = providers.find(p => p.id === req.user.id);
      isProvider = true;
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.emailVerified) {
      return res.status(400).json({ message: 'Email already verified' });
    }

    // Generate new token
    const verificationToken = generateVerificationToken();
    user.emailVerificationToken = verificationToken;
    user.updatedAt = new Date().toISOString();

    sendVerificationEmail(user.email, verificationToken);

    res.json({ message: 'Verification email sent' });
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({ message: 'Failed to resend email', error: error.message });
  }
});

// Get Current User
router.get('/me', authenticateToken, (req, res) => {
  try {
    let user = users.find(u => u.id === req.user.id);

    if (!user) {
      user = providers.find(p => p.id === req.user.id);
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { password, emailVerificationToken, ...userWithoutSensitiveData } = user;

    res.json({ user: userWithoutSensitiveData });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Failed to fetch user', error: error.message });
  }
});

// Logout
router.post('/logout', authenticateToken, (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

export default router;
