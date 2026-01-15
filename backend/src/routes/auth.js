import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { users } from '../models/database.js';

const router = express.Router();

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;

  res.json({
    message: 'Login successful',
    token: `demo-token-${user.id}`, // In production: use JWT
    user: userWithoutPassword
  });
});

// Sign up
router.post('/signup', (req, res) => {
  const { name, email, password, role, phone, country } = req.body;

  // Check if user already exists
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = {
    id: uuidv4(),
    name,
    email,
    password, // In production: hash password
    role: role || 'client',
    phone,
    country,
    verified: role === 'client', // Auto-verify clients, providers need approval
    createdAt: new Date().toISOString()
  };

  users.push(newUser);

  const { password: _, ...userWithoutPassword } = newUser;

  res.status(201).json({
    message: 'Account created successfully',
    token: `demo-token-${newUser.id}`,
    user: userWithoutPassword
  });
});

// Logout
router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

export default router;
