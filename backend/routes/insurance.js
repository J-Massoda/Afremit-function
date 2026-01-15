const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

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

// Get all insurance plans
router.get('/plans', (req, res) => {
  res.json({
    success: true,
    data: plans
  });
});

// Get single plan by ID
router.get('/plans/:planId', (req, res) => {
  const { planId } = req.params;
  const plan = plans.find(p => p.id === planId);
  
  if (!plan) {
    return res.status(404).json({
      success: false,
      message: 'Plan not found'
    });
  }
  
  res.json({
    success: true,
    data: plan
  });
});

// Create new subscription
router.post('/subscriptions', (req, res) => {
  const subscriptionData = req.body;
  
  // Validate required fields
  if (!subscriptionData.planId || !subscriptionData.personalDetails) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields'
    });
  }
  
  // Find the plan
  const plan = plans.find(p => p.id === subscriptionData.planId);
  if (!plan) {
    return res.status(404).json({
      success: false,
      message: 'Plan not found'
    });
  }
  
  // Generate policy reference
  const policyReference = `ZP-${Date.now().toString().slice(-8)}`;
  
  // Create subscription
  const subscription = {
    id: uuidv4(),
    policyReference,
    planId: subscriptionData.planId,
    planName: plan.name,
    monthlyPremium: plan.monthlyPremium,
    personalDetails: subscriptionData.personalDetails,
    beneficiaryDetails: subscriptionData.beneficiaryDetails,
    status: 'PENDING_PAYMENT',
    createdAt: new Date().toISOString(),
    startDate: null
  };
  
  subscriptions.push(subscription);
  
  res.status(201).json({
    success: true,
    data: subscription
  });
});

// Process payment
router.post('/payments', (req, res) => {
  const paymentData = req.body;
  
  // Validate required fields
  if (!paymentData.subscriptionId || !paymentData.paymentMethod || !paymentData.amount) {
    return res.status(400).json({
      success: false,
      message: 'Missing required payment fields'
    });
  }
  
  // Find subscription
  const subscription = subscriptions.find(s => s.id === paymentData.subscriptionId);
  if (!subscription) {
    return res.status(404).json({
      success: false,
      message: 'Subscription not found'
    });
  }
  
  // Simulate payment processing delay
  setTimeout(() => {
    // Mock payment success (90% success rate for demo)
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
    
    // Update subscription status
    if (isSuccess) {
      subscription.status = 'ACTIVE';
      subscription.startDate = new Date().toISOString();
      subscription.nextBillingDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    }
    
    res.json({
      success: true,
      data: payment
    });
  }, 1500); // Simulate 1.5 second processing time
});

// Get subscription by policy reference
router.get('/subscriptions/:policyReference', (req, res) => {
  const { policyReference } = req.params;
  const subscription = subscriptions.find(s => s.policyReference === policyReference);
  
  if (!subscription) {
    return res.status(404).json({
      success: false,
      message: 'Subscription not found'
    });
  }
  
  res.json({
    success: true,
    data: subscription
  });
});

// Get payment history for a subscription
router.get('/payments/:subscriptionId', (req, res) => {
  const { subscriptionId } = req.params;
  const subscriptionPayments = payments.filter(p => p.subscriptionId === subscriptionId);
  
  res.json({
    success: true,
    data: subscriptionPayments
  });
});

// Update subscription (for beneficiary updates, etc.)
router.put('/subscriptions/:subscriptionId', (req, res) => {
  const { subscriptionId } = req.params;
  const updates = req.body;
  
  const subscriptionIndex = subscriptions.findIndex(s => s.id === subscriptionId);
  
  if (subscriptionIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Subscription not found'
    });
  }
  
  // Update subscription
  subscriptions[subscriptionIndex] = {
    ...subscriptions[subscriptionIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  res.json({
    success: true,
    data: subscriptions[subscriptionIndex]
  });
});

// Cancel subscription
router.delete('/subscriptions/:subscriptionId', (req, res) => {
  const { subscriptionId } = req.params;
  
  const subscriptionIndex = subscriptions.findIndex(s => s.id === subscriptionId);
  
  if (subscriptionIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Subscription not found'
    });
  }
  
  // Mark as cancelled
  subscriptions[subscriptionIndex].status = 'CANCELLED';
  subscriptions[subscriptionIndex].cancelledAt = new Date().toISOString();
  
  res.json({
    success: true,
    message: 'Subscription cancelled successfully',
    data: subscriptions[subscriptionIndex]
  });
});

// Get statistics (for admin dashboard)
router.get('/stats', (req, res) => {
  const stats = {
    totalSubscriptions: subscriptions.length,
    activeSubscriptions: subscriptions.filter(s => s.status === 'ACTIVE').length,
    pendingSubscriptions: subscriptions.filter(s => s.status === 'PENDING_PAYMENT').length,
    cancelledSubscriptions: subscriptions.filter(s => s.status === 'CANCELLED').length,
    totalRevenue: payments
      .filter(p => p.status === 'SUCCESS')
      .reduce((sum, p) => sum + p.amount, 0),
    recentSubscriptions: subscriptions.slice(-10).reverse()
  };
  
  res.json({
    success: true,
    data: stats
  });
});

module.exports = router;
