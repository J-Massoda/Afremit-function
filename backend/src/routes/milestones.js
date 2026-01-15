import express from 'express';
import { contracts, payments } from '../models/database.js';

const router = express.Router();

// Submit milestone completion
router.post('/:id/submit', (req, res) => {
  const { evidence, notes } = req.body;

  // Find milestone across all contracts
  let targetContract = null;
  let targetMilestone = null;

  for (const contract of contracts) {
    const milestone = contract.milestones.find(m => m.id === req.params.id);
    if (milestone) {
      targetContract = contract;
      targetMilestone = milestone;
      break;
    }
  }

  if (!targetMilestone) {
    return res.status(404).json({ message: 'Milestone not found' });
  }

  targetMilestone.status = 'submitted';
  targetMilestone.submitDate = new Date().toISOString();
  targetMilestone.evidence = evidence;
  targetMilestone.notes = notes;

  res.json({
    message: 'Milestone submitted for approval',
    milestone: targetMilestone
  });
});

// Approve milestone
router.post('/:id/approve', (req, res) => {
  let targetContract = null;
  let targetMilestone = null;

  for (const contract of contracts) {
    const milestone = contract.milestones.find(m => m.id === req.params.id);
    if (milestone) {
      targetContract = contract;
      targetMilestone = milestone;
      break;
    }
  }

  if (!targetMilestone) {
    return res.status(404).json({ message: 'Milestone not found' });
  }

  // Update milestone status
  targetMilestone.status = 'approved';
  targetMilestone.approvedDate = new Date().toISOString();

  // Release payment
  targetContract.escrowBalance -= targetMilestone.amount;
  targetContract.releasedAmount += targetMilestone.amount;

  // Create payment record
  const payment = {
    id: `pay_${Date.now()}`,
    contractId: targetContract.id,
    milestoneId: targetMilestone.id,
    amount: targetMilestone.amount,
    status: 'released',
    releasedAt: new Date().toISOString()
  };

  payments.push(payment);

  res.json({
    message: 'Milestone approved and payment released',
    milestone: targetMilestone,
    payment
  });
});

// Reject milestone
router.post('/:id/reject', (req, res) => {
  const { reason } = req.body;

  let targetMilestone = null;

  for (const contract of contracts) {
    const milestone = contract.milestones.find(m => m.id === req.params.id);
    if (milestone) {
      targetMilestone = milestone;
      break;
    }
  }

  if (!targetMilestone) {
    return res.status(404).json({ message: 'Milestone not found' });
  }

  targetMilestone.status = 'rejected';
  targetMilestone.rejectionReason = reason;
  targetMilestone.rejectedDate = new Date().toISOString();

  res.json({
    message: 'Milestone rejected',
    milestone: targetMilestone
  });
});

export default router;
