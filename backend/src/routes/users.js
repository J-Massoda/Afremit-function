import express from 'express';
import { users } from '../models/database.js';

const router = express.Router();

// Get user profile
router.get('/profile', (req, res) => {
  // In production: extract user from JWT token
  const userId = req.headers.authorization?.split(' ')[1]?.split('-')[2];
  
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// Update profile
router.put('/profile', (req, res) => {
  const userId = req.headers.authorization?.split(' ')[1]?.split('-')[2];
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  Object.assign(user, req.body);
  const { password, ...userWithoutPassword } = user;

  res.json({
    message: 'Profile updated successfully',
    user: userWithoutPassword
  });
});

// Get all providers
router.get('/providers', (req, res) => {
  const providers = users
    .filter(u => u.role === 'provider')
    .map(({ password, ...userWithoutPassword }) => userWithoutPassword);

  res.json(providers);
});

// Approve provider (admin function)
router.post('/providers/:id/approve', (req, res) => {
  const provider = users.find(u => u.id === req.params.id && u.role === 'provider');

  if (!provider) {
    return res.status(404).json({ message: 'Provider not found' });
  }

  provider.verified = true;
  provider.approvedAt = new Date().toISOString();

  const { password, ...providerWithoutPassword } = provider;

  res.json({
    message: 'Provider approved successfully',
    provider: providerWithoutPassword
  });
});

export default router;
