// Mock Users for Demo/Development
export const mockUsers = {
  // Client/User accounts
  'client@demo.com': {
    id: 'user-1',
    email: 'client@demo.com',
    password: 'demo123',
    role: 'client',
    name: 'John Diaspora',
    fullName: 'John Diaspora',
    state: 'VERIFIED',
    kycStatus: 'VERIFIED',
    createdAt: '2024-01-15',
    phone: '+27 11 123 4567',
    country: 'South Africa',
    city: 'Johannesburg'
  },
  'client-unverified@demo.com': {
    id: 'user-2',
    email: 'client-unverified@demo.com',
    password: 'demo123',
    role: 'client',
    name: 'Jane Smith',
    fullName: 'Jane Smith',
    state: 'PENDING',
    kycStatus: 'PENDING',
    createdAt: '2024-01-20',
    phone: '+27 11 234 5678',
    country: 'United Kingdom',
    city: 'London'
  },
  
  // Provider accounts
  'provider@demo.com': {
    id: 'provider-1',
    email: 'provider@demo.com',
    password: 'demo123',
    role: 'provider',
    businessName: 'BuildPro Construction SA',
    fullName: 'Michael Builder',
    state: 'PUBLISHED',
    kycStatus: 'VERIFIED',
    serviceCategory: 'construction',
    createdAt: '2023-06-10',
    phone: '+27 11 345 6789',
    operatingLocations: ['Johannesburg', 'Pretoria'],
    verifiedBadge: true
  },
  'provider-pending@demo.com': {
    id: 'provider-2',
    email: 'provider-pending@demo.com',
    password: 'demo123',
    role: 'provider',
    businessName: 'Cape Medical Services',
    fullName: 'Dr. Sarah Healthcare',
    state: 'PENDING',
    kycStatus: 'PENDING',
    serviceCategory: 'medical',
    createdAt: '2024-01-18',
    phone: '+27 21 456 7890',
    operatingLocations: ['Cape Town'],
    verifiedBadge: false
  },
  
  // Admin account
  'admin@demo.com': {
    id: 'admin-1',
    email: 'admin@demo.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User',
    fullName: 'Admin User',
    state: 'VERIFIED',
    kycStatus: 'VERIFIED',
    createdAt: '2023-01-01',
    phone: '+27 11 000 0000'
  }
};

// Mock authentication function
export const mockLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers[email.toLowerCase()];
      
      if (!user) {
        reject({
          response: {
            data: {
              message: 'Invalid email or password. Try: client@demo.com / demo123'
            }
          }
        });
        return;
      }
      
      if (user.password !== password) {
        reject({
          response: {
            data: {
              message: 'Invalid email or password'
            }
          }
        });
        return;
      }
      
      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      
      resolve({
        data: {
          user: userWithoutPassword,
          token: `mock-token-${user.id}-${Date.now()}`,
          requiresEmailVerification: false,
          requiresKYC: user.kycStatus !== 'VERIFIED'
        }
      });
    }, 500); // Simulate network delay
  });
};

// Mock signup function
export const mockSignup = (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser = {
        id: `user-${Date.now()}`,
        email: userData.email,
        role: userData.role || 'client',
        name: userData.name || userData.fullName,
        fullName: userData.fullName || userData.name,
        businessName: userData.businessName,
        state: 'PENDING',
        kycStatus: 'INCOMPLETE',
        createdAt: new Date().toISOString(),
        phone: userData.phone,
        country: userData.country,
        city: userData.city
      };
      
      resolve({
        data: {
          user: newUser,
          token: `mock-token-${newUser.id}`,
          requiresEmailVerification: false,
          requiresKYC: true
        }
      });
    }, 500);
  });
};

// Helper function to get all mock users (for demo purposes)
export const getAllMockUsers = () => {
  return Object.values(mockUsers).map(({ password, ...user }) => user);
};

// Demo credentials helper
export const getDemoCredentials = () => {
  return {
    client: { email: 'client@demo.com', password: 'demo123' },
    clientUnverified: { email: 'client-unverified@demo.com', password: 'demo123' },
    provider: { email: 'provider@demo.com', password: 'demo123' },
    providerPending: { email: 'provider-pending@demo.com', password: 'demo123' },
    admin: { email: 'admin@demo.com', password: 'admin123' }
  };
};
