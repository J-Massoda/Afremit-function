// In-memory database (for MVP demo purposes)
// In production, replace with a real database

export const users = [
  {
    id: '1',
    name: 'Demo Client',
    email: 'client@demo.com',
    password: 'password123', // In production: hash passwords
    role: 'client',
    phone: '+27 123 456 789',
    country: 'South Africa',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Demo Provider',
    email: 'provider@demo.com',
    password: 'password123',
    role: 'provider',
    phone: '+27 987 654 321',
    country: 'South Africa',
    verified: true,
    rating: 5,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@demo.com',
    password: 'password123',
    role: 'admin',
    createdAt: new Date().toISOString()
  }
];

export const contracts = [
  {
    id: '1',
    clientId: '1',
    providerId: '2',
    title: 'House Construction - Johannesburg',
    description: 'Complete house construction including foundation, structure, roofing, and finishing.',
    totalAmount: 500000,
    escrowBalance: 300000,
    releasedAmount: 200000,
    status: 'in_progress',
    startDate: '2025-01-10',
    endDate: '2025-06-10',
    createdAt: '2025-01-10T00:00:00Z',
    milestones: [
      { id: '1', title: 'Foundation & Excavation', amount: 100000, order: 1, status: 'approved', description: 'Complete foundation work' },
      { id: '2', title: 'Walls & Structure', amount: 150000, order: 2, status: 'approved', description: 'Build walls and structure' },
      { id: '3', title: 'Roofing', amount: 100000, order: 3, status: 'submitted', description: 'Install roofing' },
      { id: '4', title: 'Electrical & Plumbing', amount: 100000, order: 4, status: 'pending', description: 'Install utilities' },
      { id: '5', title: 'Finishing & Painting', amount: 50000, order: 5, status: 'pending', description: 'Final touches' }
    ]
  }
];

export const payments = [
  {
    id: '1',
    contractId: '1',
    milestoneId: '1',
    amount: 100000,
    status: 'released',
    releasedAt: '2025-01-15T00:00:00Z'
  },
  {
    id: '2',
    contractId: '1',
    milestoneId: '2',
    amount: 150000,
    status: 'released',
    releasedAt: '2025-01-25T00:00:00Z'
  },
  {
    id: '3',
    contractId: '1',
    milestoneId: '3',
    amount: 100000,
    status: 'held'
  }
];
