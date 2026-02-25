/**
 * AFREMIT EDUCATION ESCROW SYSTEM - MOCK DATA
 * Complete mock data for education payment escrow with AI matching
 */

// ============================================================================
// DIASPORA PAYERS
// ============================================================================
export const mockPayers = [
  {
    payer_id: 'PAY001',
    full_name: 'John Mukamba',
    country: 'United Kingdom',
    email: 'john.mukamba@gmail.com',
    phone: '+44 7700 900123',
    linked_students: ['STU001', 'STU002'],
    payment_history: [
      { date: '2026-01-15', amount: 1200, status: 'completed' },
      { date: '2025-09-10', amount: 1200, status: 'completed' },
      { date: '2025-05-20', amount: 1200, status: 'completed' }
    ],
    total_paid: 3600,
    risk_score: 95, // High = Good
    risk_status: 'low',
    created_at: '2025-01-10'
  },
  {
    payer_id: 'PAY002',
    full_name: 'Sarah Okonkwo',
    country: 'United States',
    email: 'sarah.o@yahoo.com',
    phone: '+1 555-0123',
    linked_students: ['STU003'],
    payment_history: [
      { date: '2026-02-01', amount: 2500, status: 'completed' },
      { date: '2026-01-20', amount: 2500, status: 'flagged' }
    ],
    total_paid: 2500,
    risk_score: 65, // Medium - flagged payment
    risk_status: 'medium',
    created_at: '2026-01-15'
  },
  {
    payer_id: 'PAY003',
    full_name: 'Michael Banda',
    country: 'Canada',
    email: 'mbanda@outlook.com',
    phone: '+1 416-555-0199',
    linked_students: ['STU004', 'STU005', 'STU006'],
    payment_history: [
      { date: '2026-02-03', amount: 4200, status: 'completed' },
      { date: '2026-01-05', amount: 4200, status: 'completed' },
      { date: '2025-09-15', amount: 4200, status: 'completed' }
    ],
    total_paid: 12600,
    risk_score: 98,
    risk_status: 'low',
    created_at: '2024-08-20'
  },
  {
    payer_id: 'PAY004',
    full_name: 'Grace Ndlovu',
    country: 'South Africa',
    email: 'grace.ndlovu@gmail.com',
    phone: '+27 82 123 4567',
    linked_students: ['STU007'],
    payment_history: [
      { date: '2026-02-04', amount: 800, status: 'pending' }
    ],
    total_paid: 0,
    risk_score: 50, // New user
    risk_status: 'review',
    created_at: '2026-02-01'
  },
  {
    payer_id: 'PAY005',
    full_name: 'David Chimwemwe',
    country: 'Australia',
    email: 'dchimwemwe@gmail.com',
    phone: '+61 412 345 678',
    linked_students: ['STU008'],
    payment_history: [
      { date: '2026-01-28', amount: 1500, status: 'duplicate' },
      { date: '2026-01-28', amount: 1500, status: 'flagged' }
    ],
    total_paid: 0,
    risk_score: 40, // Suspicious duplicate
    risk_status: 'high',
    created_at: '2026-01-25'
  }
];

// ============================================================================
// EDUCATIONAL INSTITUTIONS
// ============================================================================
export const mockInstitutions = [
  {
    institution_id: 'INST001',
    name: 'University of Zimbabwe',
    country: 'Zimbabwe',
    type: 'University',
    settlement_account: 'ZW-BANK-UZ-001',
    fee_rate: 1.2, // 1.2% platform fee
    registered_students: ['STU001', 'STU003', 'STU007'],
    settlement_history: [
      { date: '2026-01-20', amount: 3580, fee: 43.2, net: 3536.8 },
      { date: '2025-09-15', amount: 2400, fee: 28.8, net: 2371.2 }
    ],
    total_settled: 6016.8,
    ai_match_accuracy_score: 96.5,
    status: 'active',
    created_at: '2024-03-10'
  },
  {
    institution_id: 'INST002',
    name: 'Nairobi Academy',
    country: 'Kenya',
    type: 'Secondary School',
    settlement_account: 'KE-BANK-NA-002',
    fee_rate: 1.0,
    registered_students: ['STU002', 'STU004', 'STU005'],
    settlement_history: [
      { date: '2026-02-01', amount: 5200, fee: 52, net: 5148 }
    ],
    total_settled: 5148,
    ai_match_accuracy_score: 94.2,
    status: 'active',
    created_at: '2024-06-15'
  },
  {
    institution_id: 'INST003',
    name: 'Lagos International School',
    country: 'Nigeria',
    type: 'International School',
    settlement_account: 'NG-BANK-LIS-003',
    fee_rate: 1.5,
    registered_students: ['STU006', 'STU008'],
    settlement_history: [],
    total_settled: 0,
    ai_match_accuracy_score: 92.0,
    status: 'active',
    created_at: '2025-11-20'
  },
  {
    institution_id: 'INST004',
    name: 'Cape Town College',
    country: 'South Africa',
    type: 'College',
    settlement_account: 'ZA-BANK-CTC-004',
    fee_rate: 1.3,
    registered_students: [],
    settlement_history: [],
    total_settled: 0,
    ai_match_accuracy_score: 0,
    status: 'pending',
    created_at: '2026-01-30'
  }
];

// ============================================================================
// STUDENTS
// ============================================================================
export const mockStudents = [
  { student_id: 'STU001', name: 'Peter Mukamba', institution_id: 'INST001', student_number: 'UZ2024001', parent_payer_id: 'PAY001' },
  { student_id: 'STU002', name: 'Mary Mukamba', institution_id: 'INST002', student_number: 'NA2025102', parent_payer_id: 'PAY001' },
  { student_id: 'STU003', name: 'Emmanuel Okonkwo', institution_id: 'INST001', student_number: 'UZ2025034', parent_payer_id: 'PAY002' },
  { student_id: 'STU004', name: 'Grace Banda', institution_id: 'INST002', student_number: 'NA2024089', parent_payer_id: 'PAY003' },
  { student_id: 'STU005', name: 'Joseph Banda', institution_id: 'INST002', student_number: 'NA2026012', parent_payer_id: 'PAY003' },
  { student_id: 'STU006', name: 'Ruth Banda', institution_id: 'INST003', student_number: 'LIS2025200', parent_payer_id: 'PAY003' },
  { student_id: 'STU007', name: 'Tendai Ndlovu', institution_id: 'INST001', student_number: 'UZ2026055', parent_payer_id: 'PAY004' },
  { student_id: 'STU008', name: 'Chipo Chimwemwe', institution_id: 'INST003', student_number: 'LIS2024178', parent_payer_id: 'PAY005' }
];

// ============================================================================
// ESCROW TRANSACTIONS
// ============================================================================
export const mockEscrowTransactions = [
  {
    transaction_id: 'TXN001',
    payer_id: 'PAY001',
    payer_name: 'John Mukamba',
    institution_id: 'INST001',
    institution_name: 'University of Zimbabwe',
    student_id: 'STU001',
    student_name: 'Peter Mukamba',
    invoice_number: 'INV-UZ-2026-001',
    invoice_amount: 1200.00,
    payer_fee: 36.00, // 3%
    institution_fee: 14.40, // 1.2%
    gross_amount: 1236.00,
    net_to_institution: 1185.60,
    escrow_status: 'released',
    match_status: 'auto_allocated',
    release_status: 'completed',
    revenue_status: 'recognized',
    match_score: 100,
    match_confidence: 'high',
    payment_date: '2026-01-15',
    allocation_date: '2026-01-15',
    release_date: '2026-01-16',
    created_at: '2026-01-15T09:30:00Z'
  },
  {
    transaction_id: 'TXN002',
    payer_id: 'PAY002',
    payer_name: 'Sarah Okonkwo',
    institution_id: 'INST001',
    institution_name: 'University of Zimbabwe',
    student_id: 'STU003',
    student_name: 'Emmanuel Okonkwo',
    invoice_number: 'INV-UZ-2026-034',
    invoice_amount: 2500.00,
    payer_fee: 75.00,
    institution_fee: 30.00,
    gross_amount: 257.00,
    net_to_institution: 2470.00,
    escrow_status: 'allocated',
    match_status: 'admin_review',
    release_status: 'pending',
    revenue_status: 'pending',
    match_score: 85,
    match_confidence: 'medium',
    payment_date: '2026-02-01',
    allocation_date: null,
    release_date: null,
    created_at: '2026-02-01T14:22:00Z',
    flagged_reason: 'Amount mismatch - Invoice shows $2,450'
  },
  {
    transaction_id: 'TXN003',
    payer_id: 'PAY003',
    payer_name: 'Michael Banda',
    institution_id: 'INST002',
    institution_name: 'Nairobi Academy',
    student_id: 'STU004',
    student_name: 'Grace Banda',
    invoice_number: 'INV-NA-2026-089',
    invoice_amount: 1400.00,
    payer_fee: 42.00,
    institution_fee: 14.00,
    gross_amount: 1442.00,
    net_to_institution: 1386.00,
    escrow_status: 'released',
    match_status: 'auto_allocated',
    release_status: 'completed',
    revenue_status: 'recognized',
    match_score: 100,
    match_confidence: 'high',
    payment_date: '2026-02-03',
    allocation_date: '2026-02-03',
    release_date: '2026-02-04',
    created_at: '2026-02-03T10:15:00Z'
  },
  {
    transaction_id: 'TXN004',
    payer_id: 'PAY003',
    payer_name: 'Michael Banda',
    institution_id: 'INST002',
    institution_name: 'Nairobi Academy',
    student_id: 'STU005',
    student_name: 'Joseph Banda',
    invoice_number: 'INV-NA-2026-012',
    invoice_amount: 1400.00,
    payer_fee: 42.00,
    institution_fee: 14.00,
    gross_amount: 1442.00,
    net_to_institution: 1386.00,
    escrow_status: 'released',
    match_status: 'auto_allocated',
    release_status: 'completed',
    revenue_status: 'recognized',
    match_score: 100,
    match_confidence: 'high',
    payment_date: '2026-02-03',
    allocation_date: '2026-02-03',
    release_date: '2026-02-04',
    created_at: '2026-02-03T10:16:00Z'
  },
  {
    transaction_id: 'TXN005',
    payer_id: 'PAY003',
    payer_name: 'Michael Banda',
    institution_id: 'INST003',
    institution_name: 'Lagos International School',
    student_id: 'STU006',
    student_name: 'Ruth Banda',
    invoice_number: 'INV-LIS-2026-200',
    invoice_amount: 1400.00,
    payer_fee: 42.00,
    institution_fee: 21.00,
    gross_amount: 1442.00,
    net_to_institution: 1379.00,
    escrow_status: 'escrowed',
    match_status: 'auto_allocated',
    release_status: 'pending_verification',
    revenue_status: 'pending',
    match_score: 98,
    match_confidence: 'high',
    payment_date: '2026-02-03',
    allocation_date: '2026-02-03',
    release_date: null,
    created_at: '2026-02-03T10:17:00Z'
  },
  {
    transaction_id: 'TXN006',
    payer_id: 'PAY004',
    payer_name: 'Grace Ndlovu',
    institution_id: 'INST001',
    institution_name: 'University of Zimbabwe',
    student_id: null,
    student_name: null,
    invoice_number: null,
    invoice_amount: 800.00,
    payer_fee: 24.00,
    institution_fee: 0,
    gross_amount: 824.00,
    net_to_institution: 0,
    escrow_status: 'escrowed',
    match_status: 'exception',
    release_status: 'on_hold',
    revenue_status: 'pending',
    match_score: 45,
    match_confidence: 'low',
    payment_date: '2026-02-04',
    allocation_date: null,
    release_date: null,
    created_at: '2026-02-04T11:45:00Z',
    flagged_reason: 'Missing student ID and invoice number - Manual allocation required'
  },
  {
    transaction_id: 'TXN007',
    payer_id: 'PAY005',
    payer_name: 'David Chimwemwe',
    institution_id: 'INST003',
    institution_name: 'Lagos International School',
    student_id: 'STU008',
    student_name: 'Chipo Chimwemwe',
    invoice_number: 'INV-LIS-2026-178',
    invoice_amount: 1500.00,
    payer_fee: 45.00,
    institution_fee: 0,
    gross_amount: 1545.00,
    net_to_institution: 0,
    escrow_status: 'escrowed',
    match_status: 'exception',
    release_status: 'on_hold',
    revenue_status: 'pending',
    match_score: 72,
    match_confidence: 'low',
    payment_date: '2026-01-28',
    allocation_date: null,
    release_date: null,
    created_at: '2026-01-28T16:30:00Z',
    flagged_reason: 'Duplicate payment detected - Same amount, same day'
  },
  {
    transaction_id: 'TXN008',
    payer_id: 'PAY001',
    payer_name: 'John Mukamba',
    institution_id: 'INST002',
    institution_name: 'Nairobi Academy',
    student_id: 'STU002',
    student_name: 'Mary Mukamba',
    invoice_number: 'INV-NA-2026-102',
    invoice_amount: 1200.00,
    payer_fee: 36.00,
    institution_fee: 12.00,
    gross_amount: 1236.00,
    net_to_institution: 1188.00,
    escrow_status: 'allocated',
    match_status: 'auto_allocated',
    release_status: 'approved_pending_release',
    revenue_status: 'pending',
    match_score: 100,
    match_confidence: 'high',
    payment_date: '2026-02-04',
    allocation_date: '2026-02-04',
    release_date: null,
    created_at: '2026-02-04T08:20:00Z'
  }
];

// ============================================================================
// AI MATCHING RULES & SCORES
// ============================================================================
export const aiMatchingRules = {
  weights: {
    student_id_match: 60,
    invoice_number_match: 25,
    parent_name_fuzzy_match: 15
  },
  thresholds: {
    auto_allocate: 95,
    admin_review: 80,
    exception: 80
  },
  confidence_levels: {
    high: '≥95%',
    medium: '80-94%',
    low: '<80%'
  }
};

// ============================================================================
// EXCEPTION QUEUE
// ============================================================================
export const mockExceptions = mockEscrowTransactions.filter(txn => 
  txn.match_status === 'exception' || txn.match_status === 'admin_review'
);

// ============================================================================
// REVENUE RECORDS
// ============================================================================
export const mockRevenueRecords = mockEscrowTransactions.map(txn => ({
  transaction_id: txn.transaction_id,
  payer_fee: txn.payer_fee,
  institution_fee: txn.institution_fee,
  total_revenue: txn.payer_fee + txn.institution_fee,
  status: txn.revenue_status,
  recognized_date: txn.revenue_status === 'recognized' ? txn.release_date : null
}));

// ============================================================================
// AUDIT LOG
// ============================================================================
export const mockAuditLog = [
  {
    id: 'AUD001',
    user: 'admin@afremit.com',
    action: 'Transaction Released',
    transaction_id: 'TXN001',
    details: 'Auto-allocated payment released to University of Zimbabwe',
    timestamp: '2026-01-16T10:00:00Z'
  },
  {
    id: 'AUD002',
    user: 'system',
    action: 'AI Match',
    transaction_id: 'TXN002',
    details: 'Score: 85% - Flagged for admin review (amount mismatch)',
    timestamp: '2026-02-01T14:22:05Z'
  },
  {
    id: 'AUD003',
    user: 'admin@afremit.com',
    action: 'Transaction Released',
    transaction_id: 'TXN003',
    details: 'Auto-allocated payment released to Nairobi Academy',
    timestamp: '2026-02-04T09:00:00Z'
  },
  {
    id: 'AUD004',
    user: 'system',
    action: 'Exception Flagged',
    transaction_id: 'TXN006',
    details: 'Score: 45% - Missing student ID and invoice number',
    timestamp: '2026-02-04T11:45:10Z'
  },
  {
    id: 'AUD005',
    user: 'system',
    action: 'Exception Flagged',
    transaction_id: 'TXN007',
    details: 'Score: 72% - Duplicate payment detected',
    timestamp: '2026-01-28T16:30:15Z'
  },
  {
    id: 'AUD006',
    user: 'admin@afremit.com',
    action: 'Institution Fee Adjusted',
    transaction_id: null,
    details: 'University of Zimbabwe fee changed from 1.0% to 1.2%',
    timestamp: '2026-01-10T14:30:00Z'
  }
];

// ============================================================================
// AI HEALTH METRICS
// ============================================================================
export const mockAIHealthMetrics = {
  match_accuracy: 91.3, // % successfully auto-allocated
  exception_rate: 8.7, // % requiring manual review
  avg_allocation_time_ms: 145,
  total_transactions: mockEscrowTransactions.length,
  auto_allocated: mockEscrowTransactions.filter(t => t.match_status === 'auto_allocated').length,
  admin_review: mockEscrowTransactions.filter(t => t.match_status === 'admin_review').length,
  exceptions: mockEscrowTransactions.filter(t => t.match_status === 'exception').length,
  last_updated: '2026-02-04T12:00:00Z'
};

// ============================================================================
// REVENUE SUMMARY
// ============================================================================
export const mockRevenueSummary = {
  total_payer_fees: mockRevenueRecords.reduce((sum, r) => sum + r.payer_fee, 0),
  total_institution_fees: mockRevenueRecords.reduce((sum, r) => sum + r.institution_fee, 0),
  pending_revenue: mockRevenueRecords.filter(r => r.status === 'pending')
    .reduce((sum, r) => sum + r.total_revenue, 0),
  recognized_revenue: mockRevenueRecords.filter(r => r.status === 'recognized')
    .reduce((sum, r) => sum + r.total_revenue, 0)
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
export const getPayerById = (payerId) => mockPayers.find(p => p.payer_id === payerId);
export const getInstitutionById = (instId) => mockInstitutions.find(i => i.institution_id === instId);
export const getStudentById = (stuId) => mockStudents.find(s => s.student_id === stuId);
export const getTransactionById = (txnId) => mockEscrowTransactions.find(t => t.transaction_id === txnId);

export const getPayersByRiskStatus = (status) => mockPayers.filter(p => p.risk_status === status);
export const getTransactionsByStatus = (status) => mockEscrowTransactions.filter(t => t.escrow_status === status);
export const getPendingExceptions = () => mockExceptions.filter(e => e.release_status === 'on_hold');
