import express from 'express';
import { payments } from '../models/database.js';

const router = express.Router();

// Get all payments
router.get('/', (req, res) => {
  res.json(payments);
});

// Get payments by contract
router.get('/contract/:contractId', (req, res) => {
  const contractPayments = payments.filter(p => p.contractId === req.params.contractId);
  res.json(contractPayments);
});

// Release payment (admin function)
router.post('/:id/release', (req, res) => {
  const payment = payments.find(p => p.id === req.params.id);

  if (!payment) {
    return res.status(404).json({ message: 'Payment not found' });
  }

  if (payment.status === 'released') {
    return res.status(400).json({ message: 'Payment already released' });
  }

  payment.status = 'released';
  payment.releasedAt = new Date().toISOString();

  res.json({
    message: 'Payment released successfully',
    payment
  });
});

export default router;
