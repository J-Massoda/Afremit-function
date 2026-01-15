import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { contracts } from '../models/database.js';

const router = express.Router();

// Get all contracts
router.get('/', (req, res) => {
  res.json(contracts);
});

// Get contract by ID
router.get('/:id', (req, res) => {
  const contract = contracts.find(c => c.id === req.params.id);
  
  if (!contract) {
    return res.status(404).json({ message: 'Contract not found' });
  }

  res.json(contract);
});

// Create new contract
router.post('/', (req, res) => {
  const { clientId, providerId, title, description, totalAmount, startDate, endDate, milestones } = req.body;

  const newContract = {
    id: uuidv4(),
    clientId,
    providerId,
    title,
    description,
    totalAmount: Number(totalAmount),
    escrowBalance: 0,
    releasedAmount: 0,
    status: 'pending',
    startDate,
    endDate,
    createdAt: new Date().toISOString(),
    milestones: milestones.map((m, index) => ({
      id: uuidv4(),
      ...m,
      order: index + 1,
      status: 'pending',
      amount: Number(m.amount)
    }))
  };

  contracts.push(newContract);

  res.status(201).json({
    message: 'Contract created successfully',
    contract: newContract
  });
});

// Fund escrow
router.post('/:id/fund', (req, res) => {
  const { amount } = req.body;
  const contract = contracts.find(c => c.id === req.params.id);

  if (!contract) {
    return res.status(404).json({ message: 'Contract not found' });
  }

  contract.escrowBalance += Number(amount);
  contract.status = 'in_progress';

  res.json({
    message: 'Escrow funded successfully',
    contract
  });
});

// Get milestones for a contract
router.get('/:id/milestones', (req, res) => {
  const contract = contracts.find(c => c.id === req.params.id);

  if (!contract) {
    return res.status(404).json({ message: 'Contract not found' });
  }

  res.json(contract.milestones);
});

export default router;
