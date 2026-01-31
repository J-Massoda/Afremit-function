import express from 'express';
import { 
  providers, 
  contracts,
  kycRecords,
  PROVIDER_STATES 
} from '../models/database.js';
import { optionalAuth } from '../middlewares/auth.js';

const router = express.Router();

// ========== PROVIDER DISCOVERY (PUBLIC/GUEST ACCESSIBLE) ==========

// Search/browse providers
router.get('/', optionalAuth, (req, res) => {
  try {
    const { 
      serviceType, 
      location, 
      verifiedOnly, 
      rating,
      search 
    } = req.query;

    // Only show published providers to guests and regular users
    let filtered = providers.filter(p => 
      p.state === PROVIDER_STATES.PUBLISHED && p.verified === true
    );

    // Filter by service type
    if (serviceType) {
      filtered = filtered.filter(p => 
        p.serviceCategory === serviceType
      );
    }

    // Filter by location
    if (location) {
      filtered = filtered.filter(p =>
        p.operatingLocations?.some(loc => 
          loc.toLowerCase().includes(location.toLowerCase())
        )
      );
    }

    // Filter by verified badge (default true)
    if (verifiedOnly !== 'false') {
      filtered = filtered.filter(p => p.verifiedBadge === true);
    }

    // Filter by minimum rating
    if (rating) {
      const minRating = parseFloat(rating);
      filtered = filtered.filter(p => p.rating >= minRating);
    }

    // Search by name or business name
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.businessName?.toLowerCase().includes(searchLower) ||
        p.services?.some(s => s.toLowerCase().includes(searchLower))
      );
    }

    // Determine what info to show based on authentication
    const isVerifiedUser = req.user && (req.user.role === 'client' || req.user.role === 'admin');

    const result = filtered.map(provider => {
      // Base info (visible to all)
      const baseInfo = {
        id: provider.id,
        businessName: provider.businessName,
        serviceCategory: provider.serviceCategory,
        operatingLocations: provider.operatingLocations,
        verified: provider.verified,
        verifiedBadge: provider.verifiedBadge,
        rating: provider.rating,
        completedContracts: provider.completedContracts,
        services: provider.services,
        bio: provider.bio
      };

      // Additional info for verified users
      if (isVerifiedUser) {
        return {
          ...baseInfo,
          name: provider.name,
          phone: '***-***-****', // Partially hidden
          canContact: true
        };
      }

      // Guest/unverified view (limited info)
      return {
        ...baseInfo,
        name: provider.businessName, // Show business name only
        canContact: false,
        requiresVerification: true
      };
    });

    res.json({
      count: result.length,
      providers: result,
      isAuthenticated: !!req.user,
      isVerifiedUser
    });
  } catch (error) {
    console.error('Provider search error:', error);
    res.status(500).json({ message: 'Failed to search providers', error: error.message });
  }
});

// Get provider profile (detailed view)
router.get('/:providerId', optionalAuth, (req, res) => {
  try {
    const { providerId } = req.params;

    const provider = providers.find(p => p.id === providerId);

    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    // Only show published/verified providers
    if (provider.state !== PROVIDER_STATES.PUBLISHED || !provider.verified) {
      return res.status(404).json({ message: 'Provider not available' });
    }

    const isVerifiedUser = req.user && (req.user.role === 'client' || req.user.role === 'admin');

    // Calculate rating based on completed contracts
    const providerContracts = contracts.filter(c => c.providerId === providerId);
    const completedCount = providerContracts.filter(c => c.status === 'COMPLETED').length;

    // Base profile (visible to all)
    const profile = {
      id: provider.id,
      businessName: provider.businessName,
      serviceCategory: provider.serviceCategory,
      operatingLocations: provider.operatingLocations,
      verified: provider.verified,
      verifiedBadge: provider.verifiedBadge,
      rating: provider.rating,
      completedContracts: provider.completedContracts || completedCount,
      services: provider.services,
      bio: provider.bio,
      publishedSince: provider.publishedAt,
      stats: {
        completedProjects: completedCount,
        activeProjects: providerContracts.filter(c => c.status === 'IN_PROGRESS').length,
        rating: provider.rating
      }
    };

    // Additional info for verified users
    if (isVerifiedUser) {
      profile.name = provider.name;
      profile.phone = provider.phone;
      profile.email = provider.email;
      profile.canContact = true;
    } else {
      profile.canContact = false;
      profile.requiresVerification = true;
      profile.message = 'Please verify your account to see full provider details and contact information';
    }

    res.json(profile);
  } catch (error) {
    console.error('Get provider profile error:', error);
    res.status(500).json({ message: 'Failed to fetch provider', error: error.message });
  }
});

// Get provider reviews/portfolio (future enhancement)
router.get('/:providerId/reviews', (req, res) => {
  try {
    const { providerId } = req.params;

    const provider = providers.find(p => p.id === providerId);

    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    // Get completed contracts as proof of work
    const completed = contracts.filter(
      c => c.providerId === providerId && c.status === 'COMPLETED'
    );

    const portfolio = completed.map(c => ({
      projectTitle: c.title,
      completedAt: c.completedAt,
      totalAmount: c.totalAmount,
      milestoneCount: milestones.filter(m => m.contractId === c.id).length
    }));

    res.json({
      providerId,
      rating: provider.rating,
      completedProjects: completed.length,
      portfolio: portfolio.slice(0, 10) // Show latest 10
    });
  } catch (error) {
    console.error('Get provider reviews error:', error);
    res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
  }
});

export default router;
