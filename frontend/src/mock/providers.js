// Mock Service Provider Data for Demo/Development
export const mockProviders = [
  // Construction Providers
  {
    id: '1',
    businessName: 'BuildPro Construction SA',
    serviceCategory: 'construction',
    operatingLocations: ['Johannesburg', 'Pretoria', 'Midrand'],
    rating: 4.8,
    completedContracts: 32,
    verifiedBadge: true,
    state: 'PUBLISHED',
    bio: 'Leading construction company specializing in residential and commercial projects across Gauteng. Over 15 years of experience delivering quality construction services.',
    services: [
      'Residential Construction',
      'Commercial Buildings',
      'Renovations & Extensions',
      'Project Management'
    ],
    yearsInBusiness: 15,
    registrationNumber: 'CIDB-12345-SA',
    insuranceDetails: {
      provider: 'Zororo Phumulani Insurance',
      policyNumber: 'ZP-BUILD-2024-001',
      coverage: 'R5,000,000'
    },
    contactEmail: 'info@buildpro.co.za',
    contactPhone: '+27 11 123 4567',
    website: 'www.buildpro.co.za',
    portfolio: [
      {
        title: 'Sandton Executive Residence',
        description: 'Luxury 5-bedroom home with modern finishes',
        value: 'R2,500,000',
        completionDate: '2024-03'
      },
      {
        title: 'Pretoria Office Complex',
        description: '3-story commercial building',
        value: 'R8,000,000',
        completionDate: '2023-11'
      },
      {
        title: 'Midrand Townhouse Development',
        description: '12-unit residential complex',
        value: 'R15,000,000',
        completionDate: '2023-06'
      }
    ],
    reviews: [
      {
        id: 'r1',
        clientName: 'David M.',
        rating: 5,
        comment: 'Excellent work on our home renovation. Professional team, stayed within budget and timeline.',
        date: '2024-01-15',
        projectType: 'Home Renovation'
      },
      {
        id: 'r2',
        clientName: 'Sarah K.',
        rating: 5,
        comment: 'Built our dream home. Communication was great throughout the process.',
        date: '2023-12-10',
        projectType: 'New Residential Build'
      }
    ]
  },
  {
    id: '2',
    businessName: 'Mzana Civil & Housing',
    serviceCategory: 'construction',
    operatingLocations: ['Pretoria', 'Centurion', 'Krugersdorp'],
    rating: 4.5,
    completedContracts: 28,
    verifiedBadge: true,
    state: 'PUBLISHED',
    bio: 'Trusted civil engineering and housing construction specialists. We deliver sustainable, high-quality infrastructure and residential projects.',
    services: [
      'Civil Engineering',
      'Housing Development',
      'Infrastructure Projects',
      'Road Construction'
    ],
    yearsInBusiness: 12,
    registrationNumber: 'CIDB-67890-SA',
    insuranceDetails: {
      provider: 'Zororo Phumulani Insurance',
      policyNumber: 'ZP-CIVIL-2024-002',
      coverage: 'R3,500,000'
    },
    contactEmail: 'contact@mzanacivil.co.za',
    contactPhone: '+27 12 234 5678',
    website: 'www.mzanacivil.co.za',
    portfolio: [
      {
        title: 'Pretoria Municipal Roads',
        description: 'Road rehabilitation project - 5km stretch',
        value: 'R4,500,000',
        completionDate: '2024-01'
      },
      {
        title: 'Centurion Housing Estate',
        description: '8-unit affordable housing project',
        value: 'R6,000,000',
        completionDate: '2023-09'
      }
    ],
    reviews: [
      {
        id: 'r3',
        clientName: 'John P.',
        rating: 4,
        comment: 'Good quality work. Minor delays but overall satisfied with the result.',
        date: '2024-01-05',
        projectType: 'House Construction'
      }
    ]
  },
  {
    id: '3',
    businessName: 'Harare Elite Builders',
    serviceCategory: 'construction',
    operatingLocations: ['Harare', 'Bulawayo', 'Mutare'],
    rating: 4.7,
    completedContracts: 45,
    verifiedBadge: true,
    state: 'PUBLISHED',
    bio: 'Zimbabwe\'s premier construction company with a reputation for excellence. Specializing in residential, commercial, and industrial projects.',
    services: [
      'Residential Construction',
      'Commercial Projects',
      'Industrial Buildings',
      'Property Renovations'
    ],
    yearsInBusiness: 18,
    registrationNumber: 'ZIM-BUILD-567-HRE',
    insuranceDetails: {
      provider: 'Zororo Phumulani Insurance',
      policyNumber: 'ZP-HRE-2024-003',
      coverage: 'USD $500,000'
    },
    contactEmail: 'info@elitebuilders.co.zw',
    contactPhone: '+263 24 123 4567',
    website: 'www.harareelitebuilders.co.zw',
    portfolio: [
      {
        title: 'Borrowdale Luxury Villa',
        description: 'Premium 6-bedroom residence',
        value: 'USD $350,000',
        completionDate: '2023-12'
      },
      {
        title: 'Avondale Shopping Complex',
        description: 'Modern retail space development',
        value: 'USD $800,000',
        completionDate: '2023-08'
      }
    ],
    reviews: [
      {
        id: 'r4',
        clientName: 'Michael T.',
        rating: 5,
        comment: 'Outstanding craftsmanship. They transformed our vision into reality.',
        date: '2023-12-20',
        projectType: 'Luxury Home'
      }
    ]
  },
  
  // Medical Provider
  {
    id: '4',
    businessName: 'Sandton Private Clinic',
    serviceCategory: 'healthcare',
    operatingLocations: ['Johannesburg', 'Sandton', 'Rosebank'],
    rating: 4.4,
    completedContracts: 156,
    verifiedBadge: true,
    state: 'PUBLISHED',
    bio: 'Premium private healthcare facility offering comprehensive medical services. State-of-the-art equipment and experienced medical professionals.',
    services: [
      'General Consultations',
      'Specialist Care',
      'Diagnostic Imaging',
      'Minor Procedures',
      'Health Screenings'
    ],
    yearsInBusiness: 10,
    businessRegistration: 'HPCSA-MED-7890',
    taxNumber: 'TAX-MED-7890',
    insuranceDetails: {
      provider: 'Medical Malpractice Insurance',
      policyNumber: 'MED-SPC-2024-001',
      coverage: 'R10,000,000'
    },
    healthcareDetails: {
      specializations: [
        { name: 'Cardiology', description: 'Heart and cardiovascular system specialists' },
        { name: 'Orthopedics', description: 'Bone, joint, and muscle care' },
        { name: 'General Medicine', description: 'Comprehensive primary healthcare' },
        { name: 'Pediatrics', description: 'Child healthcare specialists' }
      ],
      consultationFees: [
        { type: 'General Consultation', amount: 800 },
        { type: 'Specialist Consultation', amount: 1500 },
        { type: 'Emergency Consultation', amount: 2000 },
        { type: 'Follow-up Visit', amount: 500 }
      ],
      operatingHours: {
        monday: '08:00 - 18:00',
        tuesday: '08:00 - 18:00',
        wednesday: '08:00 - 18:00',
        thursday: '08:00 - 18:00',
        friday: '08:00 - 18:00',
        saturday: '09:00 - 13:00',
        sunday: 'Emergency Only'
      },
      acceptedInsurance: ['Discovery', 'Momentum', 'Bonitas', 'Medshield', 'Cash Patients']
    },
    stats: {
      totalProjects: 156,
      averageProjectValue: 1200,
      onTimeCompletion: 152
    },
    reviews: [
      {
        id: 'r5',
        clientName: 'Lisa M.',
        rating: 5,
        comment: 'Excellent care and professional staff. Highly recommend.',
        date: '2024-01-20',
        serviceType: 'General Consultation'
      },
      {
        id: 'r6',
        clientName: 'James R.',
        rating: 4,
        comment: 'Good service, though wait times can be long during peak hours.',
        date: '2024-01-10',
        serviceType: 'Specialist Appointment'
      }
    ]
  },
  
  // Education Provider
  {
    id: '5',
    businessName: 'Cape Town International College',
    serviceCategory: 'education',
    operatingLocations: ['Cape Town', 'Stellenbosch'],
    rating: 4.6,
    completedContracts: 89,
    verifiedBadge: true,
    state: 'PUBLISHED',
    bio: 'Accredited international college offering quality education from primary to tertiary level. Cambridge and IEB curriculum with experienced faculty.',
    services: [
      'Primary Education',
      'Secondary Education',
      'A-Levels',
      'University Preparation',
      'Online Learning'
    ],
    yearsInBusiness: 25,
    businessRegistration: 'DBE-CPT-1234',
    taxNumber: 'TAX-EDU-1234',
    accreditation: ['Cambridge International', 'IEB', 'Umalusi'],
    educationDetails: {
      courses: [
        {
          name: 'Primary Education (Grade R - 7)',
          description: 'Comprehensive foundational education with Cambridge curriculum',
          duration: '8 years',
          fee: '45,000 per year'
        },
        {
          name: 'Secondary Education (Grade 8 - 12)',
          description: 'IEB curriculum with university preparation focus',
          duration: '5 years',
          fee: '65,000 per year'
        },
        {
          name: 'A-Levels Programme',
          description: 'Cambridge A-Levels for international university admission',
          duration: '2 years',
          fee: '85,000 per year'
        },
        {
          name: 'Online Learning Programme',
          description: 'Flexible online courses with live virtual classes',
          duration: 'Varies',
          fee: '35,000 per year'
        }
      ],
      paymentStructure: [
        { type: 'Annual Payment', details: 'Full year payment - 5% discount' },
        { type: 'Semester Payment', details: 'Two payments per year' },
        { type: 'Monthly Installments', details: '11 monthly payments' },
        { type: 'Sibling Discount', details: '10% discount for second child, 15% for third' }
      ],
      admissionRequirements: [
        'Completed application form',
        'Previous school reports',
        'Birth certificate',
        'Entrance assessment (Grade 8+)',
        'Interview with principal'
      ],
      facilities: [
        'Modern Classrooms with Smart Boards',
        'Science & Computer Laboratories',
        'Sports Complex & Swimming Pool',
        'Library & IT Center',
        'Arts & Music Studios'
      ]
    },
    stats: {
      totalProjects: 89,
      averageProjectValue: 55000,
      onTimeCompletion: 89
    },
    reviews: [
      {
        id: 'r7',
        clientName: 'Patricia N.',
        rating: 5,
        comment: 'Excellent education standard. My children have thrived here.',
        date: '2024-01-18',
        serviceType: 'Secondary Education'
      },
      {
        id: 'r8',
        clientName: 'Robert K.',
        rating: 4,
        comment: 'Good school with strong academics. Facilities could use updating.',
        date: '2023-12-15',
        serviceType: 'Primary Education'
      }
    ]
  },

  // Additional Construction Provider
  {
    id: '6',
    businessName: 'Durban Coastal Builders',
    serviceCategory: 'construction',
    operatingLocations: ['Durban', 'Umhlanga', 'Ballito'],
    rating: 4.6,
    completedContracts: 38,
    verifiedBadge: true,
    state: 'PUBLISHED',
    bio: 'Coastal construction specialists with expertise in building beautiful homes and structures that withstand coastal conditions.',
    services: [
      'Coastal Home Construction',
      'Beach Property Renovations',
      'Commercial Developments',
      'Weather-Resistant Structures'
    ],
    yearsInBusiness: 14,
    registrationNumber: 'CIDB-45678-KZN',
    insuranceDetails: {
      provider: 'Zororo Phumulani Insurance',
      policyNumber: 'ZP-DBN-2024-004',
      coverage: 'R4,000,000'
    },
    contactEmail: 'info@durbancoastal.co.za',
    contactPhone: '+27 31 567 8901',
    website: 'www.durbancoastalbuilders.co.za',
    portfolio: [
      {
        title: 'Umhlanga Beach Villa',
        description: 'Modern 4-bedroom coastal home',
        value: 'R3,200,000',
        completionDate: '2023-11'
      }
    ],
    reviews: [
      {
        id: 'r9',
        clientName: 'Andrew S.',
        rating: 5,
        comment: 'Built our beach house. Quality work and attention to detail.',
        date: '2023-12-05',
        projectType: 'Coastal Home'
      }
    ]
  }
];

// Helper function to search/filter providers
export const searchProviders = (filters = {}) => {
  let results = [...mockProviders];

  // Filter by service type
  if (filters.serviceType && filters.serviceType !== '') {
    results = results.filter(p => p.serviceCategory === filters.serviceType);
  }

  // Filter by location
  if (filters.location && filters.location !== '') {
    results = results.filter(p => 
      p.operatingLocations.some(loc => 
        loc.toLowerCase().includes(filters.location.toLowerCase())
      )
    );
  }

  // Filter by search term
  if (filters.search && filters.search !== '') {
    const searchTerm = filters.search.toLowerCase();
    results = results.filter(p =>
      p.businessName.toLowerCase().includes(searchTerm) ||
      p.bio.toLowerCase().includes(searchTerm) ||
      p.services.some(s => s.toLowerCase().includes(searchTerm))
    );
  }

  // Filter verified only
  if (filters.verifiedOnly === 'true' || filters.verifiedOnly === true) {
    results = results.filter(p => p.verifiedBadge === true);
  }

  // Filter by rating
  if (filters.rating && filters.rating !== '') {
    const minRating = parseFloat(filters.rating);
    results = results.filter(p => p.rating >= minRating);
  }

  return results;
};

// Helper function to get provider by ID
export const getProviderById = (id) => {
  return mockProviders.find(p => p.id === id);
};

// Helper function to get verified providers for landing page
export const getVerifiedProviders = (limit = 6) => {
  return mockProviders
    .filter(p => p.verifiedBadge === true)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};
