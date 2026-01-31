// In-memory database (for MVP demo purposes)
// In production, replace with PostgreSQL/MongoDB

// ========== STATE ENUMS ==========
export const USER_STATES = {
  REGISTERED: 'REGISTERED',
  EMAIL_VERIFIED: 'EMAIL_VERIFIED',
  KYC_PENDING: 'KYC_PENDING',
  VERIFIED: 'VERIFIED',
  SUSPENDED: 'SUSPENDED'
};

export const PROVIDER_STATES = {
  APPLIED: 'APPLIED',
  DOCUMENTS_SUBMITTED: 'DOCUMENTS_SUBMITTED',
  KYC_REVIEW: 'KYC_REVIEW',
  VERIFIED: 'VERIFIED',
  PUBLISHED: 'PUBLISHED',
  SUSPENDED: 'SUSPENDED'
};

export const KYC_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export const CONTRACT_STATUS = {
  DRAFT: 'DRAFT',
  PENDING_ACCEPTANCE: 'PENDING_ACCEPTANCE',
  ACTIVE: 'ACTIVE',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  DISPUTED: 'DISPUTED',
  CANCELLED: 'CANCELLED'
};

export const MILESTONE_STATUS = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  SUBMITTED: 'SUBMITTED',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  PAID: 'PAID'
};

export const ESCROW_STATUS = {
  HELD: 'HELD',
  RELEASED: 'RELEASED',
  COMPLETED: 'COMPLETED',
  REFUNDED: 'REFUNDED'
};

// ========== DATA STORES ==========
// Users (Clients)
export const users = [
  {
    id: '1',
    name: 'Demo Client',
    email: 'client@demo.com',
    password: '$2a$10$rZ0v8Lj3Qz1VqKZ9Yh8Wj.w6F9h8N1Yh8N1Yh8N1Yh8N1Yh8N1Y', // hashed: password123
    role: 'client',
    phone: '+27 123 456 789',
    country: 'South Africa',
    state: USER_STATES.VERIFIED,
    emailVerified: true,
    emailVerificationToken: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@demo.com',
    password: '$2a$10$rZ0v8Lj3Qz1VqKZ9Yh8Wj.w6F9h8N1Yh8N1Yh8N1Yh8N1Yh8N1Y', // hashed: password123
    role: 'admin',
    state: USER_STATES.VERIFIED,
    emailVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Service Providers
export const providers = [
  {
    id: '2',
    name: 'Demo Provider',
    email: 'provider@demo.com',
    password: '$2a$10$rZ0v8Lj3Qz1VqKZ9Yh8Wj.w6F9h8N1Yh8N1Yh8N1Yh8N1Yh8N1Y', // hashed: password123
    role: 'provider',
    phone: '+27 987 654 321',
    country: 'South Africa',
    state: PROVIDER_STATES.PUBLISHED,
    verified: true,
    verifiedBadge: true,
    rating: 4.8,
    completedContracts: 15,
    serviceCategory: 'construction',
    businessName: 'Premier Builders Ltd',
    businessRegistration: 'REG123456',
    operatingLocations: ['Johannesburg', 'Pretoria', 'Cape Town'],
    bio: 'Professional construction company with 15+ years experience',
    services: ['Residential Construction', 'Commercial Construction', 'Renovations'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// KYC Records
export const kycRecords = [
  {
    id: '1',
    userId: '1',
    userType: 'client',
    fullName: 'Demo Client',
    dateOfBirth: '1990-01-15',
    country: 'South Africa',
    idNumber: 'SA123456789',
    idDocument: '/uploads/kyc/id-1.pdf',
    proofOfIdentity: '/uploads/kyc/proof-1.pdf',
    status: KYC_STATUS.APPROVED,
    reviewedBy: '3',
    reviewedAt: new Date().toISOString(),
    submittedAt: new Date().toISOString(),
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    userId: '2',
    userType: 'provider',
    businessName: 'Premier Builders Ltd',
    businessRegistration: 'REG123456',
    taxNumber: 'TAX789012',
    businessRegistrationDoc: '/uploads/kyc/business-reg-2.pdf',
    directorId: '/uploads/kyc/director-id-2.pdf',
    proofOfAddress: '/uploads/kyc/address-2.pdf',
    serviceCategory: 'construction',
    operatingLocations: ['Johannesburg', 'Pretoria', 'Cape Town'],
    status: KYC_STATUS.APPROVED,
    reviewedBy: '3',
    reviewedAt: new Date().toISOString(),
    submittedAt: new Date().toISOString(),
    createdAt: new Date().toISOString()
  }
];

// Quotes (Construction Service Requests)
export const quotes = [
  {
    id: '1',
    userId: '1',
    serviceType: 'construction',
    constructionType: 'Residential House',
    budgetRange: '400000-600000',
    duration: '6 months',
    location: 'Johannesburg, South Africa',
    landDetails: '500sqm plot in residential area',
    blueprints: ['/uploads/quotes/blueprint-1.pdf'],
    referenceImages: ['/uploads/quotes/ref-1.jpg', '/uploads/quotes/ref-2.jpg'],
    requestSurveyor: true,
    proposedMilestones: [
      { title: 'Foundation', percentage: 20 },
      { title: 'Structure', percentage: 30 },
      { title: 'Roofing', percentage: 20 },
      { title: 'Utilities', percentage: 20 },
      { title: 'Finishing', percentage: 10 }
    ],
    status: 'open',
    responses: ['response-1'],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Quote Responses
export const quoteResponses = [
  {
    id: 'response-1',
    quoteId: '1',
    providerId: '2',
    totalCost: 550000,
    timeline: '6 months',
    recommendedMilestones: [
      { title: 'Foundation & Excavation', amount: 100000, order: 1, description: 'Complete foundation work' },
      { title: 'Walls & Structure', amount: 150000, order: 2, description: 'Build walls and structure' },
      { title: 'Roofing', amount: 120000, order: 3, description: 'Install roofing' },
      { title: 'Electrical & Plumbing', amount: 100000, order: 4, description: 'Install utilities' },
      { title: 'Finishing & Painting', amount: 80000, order: 5, description: 'Final touches' }
    ],
    constructionPlan: '/uploads/responses/plan-1.pdf',
    message: 'We can complete your project with high-quality materials and expert craftsmanship.',
    status: 'pending',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const contracts = [
  {
    id: '1',
    quoteId: '1',
    quoteResponseId: 'response-1',
    clientId: '1',
    providerId: '2',
    title: 'House Construction - Johannesburg',
    description: 'Complete house construction including foundation, structure, roofing, and finishing.',
    totalAmount: 550000,
    escrowBalance: 320000,
    releasedAmount: 230000,
    status: CONTRACT_STATUS.IN_PROGRESS,
    startDate: '2025-01-10',
    expectedEndDate: '2025-07-10',
    acceptedAt: '2025-01-05T00:00:00Z',
    createdAt: '2025-01-05T00:00:00Z',
    updatedAt: new Date().toISOString()
  }
];

// Milestones (separate from contracts for better management)
export const milestones = [
  { 
    id: '1', 
    contractId: '1',
    title: 'Foundation & Excavation', 
    amount: 100000, 
    order: 1, 
    status: MILESTONE_STATUS.PAID, 
    description: 'Complete foundation work',
    submittedAt: '2025-01-15T00:00:00Z',
    approvedAt: '2025-01-16T00:00:00Z',
    paidAt: '2025-01-17T00:00:00Z',
    evidence: ['/uploads/milestones/m1-photo1.jpg', '/uploads/milestones/m1-photo2.jpg']
  },
  { 
    id: '2', 
    contractId: '1',
    title: 'Walls & Structure', 
    amount: 150000, 
    order: 2, 
    status: MILESTONE_STATUS.PAID, 
    description: 'Build walls and structure',
    submittedAt: '2025-01-25T00:00:00Z',
    approvedAt: '2025-01-26T00:00:00Z',
    paidAt: '2025-01-27T00:00:00Z',
    evidence: ['/uploads/milestones/m2-photo1.jpg']
  },
  { 
    id: '3', 
    contractId: '1',
    title: 'Roofing', 
    amount: 120000, 
    order: 3, 
    status: MILESTONE_STATUS.SUBMITTED, 
    description: 'Install roofing',
    submittedAt: new Date().toISOString(),
    evidence: ['/uploads/milestones/m3-photo1.jpg', '/uploads/milestones/m3-photo2.jpg']
  },
  { 
    id: '4', 
    contractId: '1',
    title: 'Electrical & Plumbing', 
    amount: 100000, 
    order: 4, 
    status: MILESTONE_STATUS.IN_PROGRESS, 
    description: 'Install utilities'
  },
  { 
    id: '5', 
    contractId: '1',
    title: 'Finishing & Painting', 
    amount: 80000, 
    order: 5, 
    status: MILESTONE_STATUS.PENDING, 
    description: 'Final touches'
  }
];

// Escrow Ledger (tracks all escrow transactions)
export const escrowLedger = [
  {
    id: 'escrow-1',
    contractId: '1',
    milestoneId: '1',
    amount: 100000,
    status: ESCROW_STATUS.COMPLETED,
    heldAt: '2025-01-10T00:00:00Z',
    releasedAt: '2025-01-17T00:00:00Z',
    completedAt: '2025-01-17T00:00:00Z'
  },
  {
    id: 'escrow-2',
    contractId: '1',
    milestoneId: '2',
    amount: 150000,
    status: ESCROW_STATUS.COMPLETED,
    heldAt: '2025-01-10T00:00:00Z',
    releasedAt: '2025-01-27T00:00:00Z',
    completedAt: '2025-01-27T00:00:00Z'
  },
  {
    id: 'escrow-3',
    contractId: '1',
    milestoneId: '3',
    amount: 120000,
    status: ESCROW_STATUS.HELD,
    heldAt: '2025-01-10T00:00:00Z'
  },
  {
    id: 'escrow-4',
    contractId: '1',
    milestoneId: '4',
    amount: 100000,
    status: ESCROW_STATUS.HELD,
    heldAt: '2025-01-10T00:00:00Z'
  },
  {
    id: 'escrow-5',
    contractId: '1',
    milestoneId: '5',
    amount: 80000,
    status: ESCROW_STATUS.HELD,
    heldAt: '2025-01-10T00:00:00Z'
  }
];

export const payments = [
  {
    id: '1',
    contractId: '1',
    milestoneId: '1',
    escrowLedgerId: 'escrow-1',
    amount: 100000,
    status: 'completed',
    paymentMethod: 'escrow_release',
    releasedAt: '2025-01-17T00:00:00Z',
    createdAt: '2025-01-17T00:00:00Z'
  },
  {
    id: '2',
    contractId: '1',
    milestoneId: '2',
    escrowLedgerId: 'escrow-2',
    amount: 150000,
    status: 'completed',
    paymentMethod: 'escrow_release',
    releasedAt: '2025-01-27T00:00:00Z',
    createdAt: '2025-01-27T00:00:00Z'
  }
];

// Insurance Subscriptions (from insurance.js routes)
export const insuranceSubscriptions = [];

// Medical & Education Services (Direct Payment Services)
export const services = [
  {
    id: 'med-1',
    providerId: '2',
    serviceType: 'medical',
    serviceName: 'General Consultation',
    description: 'Professional medical consultation with licensed practitioners',
    pricing: {
      type: 'fixed',
      amount: 500,
      currency: 'ZAR'
    },
    location: 'Johannesburg',
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'edu-1',
    providerId: '2',
    serviceType: 'education',
    serviceName: 'University Application Support',
    description: 'Complete support for university applications including documentation and guidance',
    pricing: {
      type: 'package',
      amount: 2500,
      currency: 'ZAR'
    },
    location: 'Online',
    available: true,
    createdAt: new Date().toISOString()
  }
];

// Service Bookings (for medical/education direct payments)
export const serviceBookings = [];
