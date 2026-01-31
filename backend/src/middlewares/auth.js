import jwt from 'jsonwebtoken';
import { users, providers } from '../models/database.js';

const JWT_SECRET = process.env.JWT_SECRET || 'afremit-demo-secret-key-2026';

// Verify JWT token
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    req.user = decoded;
    next();
  });
};

// Require specific role
export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Access denied. Required role: ${allowedRoles.join(' or ')}` 
      });
    }

    next();
  };
};

// Check user state (for clients)
export const requireUserState = (...allowedStates) => {
  return (req, res, next) => {
    const user = users.find(u => u.id === req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!allowedStates.includes(user.state)) {
      return res.status(403).json({ 
        message: `Account not ready. Current state: ${user.state}`,
        requiredStates: allowedStates,
        currentState: user.state
      });
    }

    req.userRecord = user;
    next();
  };
};

// Check provider state
export const requireProviderState = (...allowedStates) => {
  return (req, res, next) => {
    const provider = providers.find(p => p.id === req.user.id);

    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    if (!allowedStates.includes(provider.state)) {
      return res.status(403).json({ 
        message: `Provider account not ready. Current state: ${provider.state}`,
        requiredStates: allowedStates,
        currentState: provider.state
      });
    }

    req.providerRecord = provider;
    next();
  };
};

// Check if user's email is verified
export const requireEmailVerified = (req, res, next) => {
  const user = users.find(u => u.id === req.user.id) || 
                providers.find(p => p.id === req.user.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (!user.emailVerified) {
    return res.status(403).json({ 
      message: 'Email verification required. Please check your email.' 
    });
  }

  next();
};

// Optional authentication (doesn't block if no token)
export const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    req.user = null;
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      req.user = null;
    } else {
      req.user = decoded;
    }
    next();
  });
};

export default {
  authenticateToken,
  requireRole,
  requireUserState,
  requireProviderState,
  requireEmailVerified,
  optionalAuth
};
