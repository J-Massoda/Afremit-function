import express from 'express';
import { 
  users, 
  providers, 
  kycRecords,
  contracts,
  milestones,
  escrowLedger,
  quotes,
  quoteResponses,
  USER_STATES, 
  PROVIDER_STATES, 
  KYC_STATUS,
  MILESTONE_STATUS,
  ESCROW_STATUS
} from '../models/database.js';
import { authenticateToken, requireRole } from '../middlewares/auth.js';

const router = express.Router();

// All admin routes require admin role
router.use(authenticateToken);
router.use(requireRole('admin'));

// ========== KYC MANAGEMENT ==========

// Get all pending KYC submissions
router.get('/kyc/pending', (req, res) => {
  try {
    const pendingKyc = kycRecords.filter(k => k.status === KYC_STATUS.PENDING);

    // Attach user/provider details
    const enrichedKyc = pendingKyc.map(kyc => {
      const user = kyc.userType === 'client' 
        ? users.find(u => u.id === kyc.userId)
        : providers.find(p => p.id === kyc.userId);

      return {
        ...kyc,
        userEmail: user?.email,
        userName: user?.name,
        userPhone: user?.phone
      };
    });

    res.json({
      count: enrichedKyc.length,
      kyc: enrichedKyc
    });
  } catch (error) {
    console.error('Get pending KYC error:', error);
    res.status(500).json({ message: 'Failed to fetch KYC', error: error.message });
  }
});

// Get all KYC submissions (with filters)
router.get('/kyc', (req, res) => {
  try {
    const { status, userType } = req.query;

    let filtered = [...kycRecords];

    if (status) {
      filtered = filtered.filter(k => k.status === status);
    }

    if (userType) {
      filtered = filtered.filter(k => k.userType === userType);
    }

    // Attach user details
    const enriched = filtered.map(kyc => {
      const user = kyc.userType === 'client'
        ? users.find(u => u.id === kyc.userId)
        : providers.find(p => p.id === kyc.userId);

      return {
        ...kyc,
        userEmail: user?.email,
        userName: user?.name,
        userPhone: user?.phone,
        userState: user?.state
      };
    });

    res.json({
      count: enriched.length,
      kyc: enriched
    });
  } catch (error) {
    console.error('Get KYC error:', error);
    res.status(500).json({ message: 'Failed to fetch KYC', error: error.message });
  }
});

// Get specific KYC submission
router.get('/kyc/:kycId', (req, res) => {
  try {
    const { kycId } = req.params;

    const kyc = kycRecords.find(k => k.id === kycId);

    if (!kyc) {
      return res.status(404).json({ message: 'KYC record not found' });
    }

    // Attach user details
    const user = kyc.userType === 'client'
      ? users.find(u => u.id === kyc.userId)
      : providers.find(p => p.id === kyc.userId);

    res.json({
      ...kyc,
      user: {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        state: user?.state
      }
    });
  } catch (error) {
    console.error('Get KYC details error:', error);
    res.status(500).json({ message: 'Failed to fetch KYC details', error: error.message });
  }
});

// Approve KYC
router.post('/kyc/:kycId/approve', (req, res) => {
  try {
    const { kycId } = req.params;
    const adminId = req.user.id;

    const kyc = kycRecords.find(k => k.id === kycId);

    if (!kyc) {
      return res.status(404).json({ message: 'KYC record not found' });
    }

    if (kyc.status !== KYC_STATUS.PENDING) {
      return res.status(400).json({ 
        message: `KYC already ${kyc.status.toLowerCase()}` 
      });
    }

    // Update KYC status
    kyc.status = KYC_STATUS.APPROVED;
    kyc.reviewedBy = adminId;
    kyc.reviewedAt = new Date().toISOString();

    // Update user/provider state
    if (kyc.userType === 'client') {
      const user = users.find(u => u.id === kyc.userId);
      if (user) {
        user.state = USER_STATES.VERIFIED;
        user.updatedAt = new Date().toISOString();
      }
    } else {
      const provider = providers.find(p => p.id === kyc.userId);
      if (provider) {
        provider.state = PROVIDER_STATES.VERIFIED;
        provider.verified = true;
        provider.verifiedBadge = true;
        provider.updatedAt = new Date().toISOString();
      }
    }

    res.json({
      message: 'KYC approved successfully',
      kyc: {
        id: kyc.id,
        userId: kyc.userId,
        userType: kyc.userType,
        status: kyc.status,
        reviewedAt: kyc.reviewedAt
      }
    });
  } catch (error) {
    console.error('KYC approval error:', error);
    res.status(500).json({ message: 'Failed to approve KYC', error: error.message });
  }
});

// Reject KYC
router.post('/kyc/:kycId/reject', (req, res) => {
  try {
    const { kycId } = req.params;
    const { reason } = req.body;
    const adminId = req.user.id;

    if (!reason) {
      return res.status(400).json({ message: 'Rejection reason required' });
    }

    const kyc = kycRecords.find(k => k.id === kycId);

    if (!kyc) {
      return res.status(404).json({ message: 'KYC record not found' });
    }

    if (kyc.status !== KYC_STATUS.PENDING) {
      return res.status(400).json({ 
        message: `KYC already ${kyc.status.toLowerCase()}` 
      });
    }

    // Update KYC status
    kyc.status = KYC_STATUS.REJECTED;
    kyc.reviewedBy = adminId;
    kyc.reviewedAt = new Date().toISOString();
    kyc.rejectionReason = reason;

    // User/provider can resubmit, so state stays as is
    // Or optionally move back to EMAIL_VERIFIED/DOCUMENTS_SUBMITTED

    res.json({
      message: 'KYC rejected',
      kyc: {
        id: kyc.id,
        userId: kyc.userId,
        status: kyc.status,
        rejectionReason: reason
      }
    });
  } catch (error) {
    console.error('KYC rejection error:', error);
    res.status(500).json({ message: 'Failed to reject KYC', error: error.message });
  }
});

// ========== MILESTONE APPROVAL ==========

// Get all submitted milestones
router.get('/milestones/pending', (req, res) => {
  try {
    const pendingMilestones = milestones.filter(
      m => m.status === MILESTONE_STATUS.SUBMITTED
    );

    // Enrich with contract details
    const enriched = pendingMilestones.map(milestone => {
      const contract = contracts.find(c => c.id === milestone.contractId);
      const provider = providers.find(p => p.id === contract?.providerId);
      const client = users.find(u => u.id === contract?.clientId);

      return {
        ...milestone,
        contract: {
          id: contract?.id,
          title: contract?.title,
          totalAmount: contract?.totalAmount
        },
        provider: {
          id: provider?.id,
          name: provider?.name,
          businessName: provider?.businessName
        },
        client: {
          id: client?.id,
          name: client?.name
        }
      };
    });

    res.json({
      count: enriched.length,
      milestones: enriched
    });
  } catch (error) {
    console.error('Get pending milestones error:', error);
    res.status(500).json({ message: 'Failed to fetch milestones', error: error.message });
  }
});

// Approve milestone
router.post('/milestones/:milestoneId/approve', (req, res) => {
  try {
    const { milestoneId } = req.params;

    const milestone = milestones.find(m => m.id === milestoneId);

    if (!milestone) {
      return res.status(404).json({ message: 'Milestone not found' });
    }

    if (milestone.status !== MILESTONE_STATUS.SUBMITTED) {
      return res.status(400).json({ 
        message: `Milestone is ${milestone.status}, cannot approve` 
      });
    }

    // Update milestone
    milestone.status = MILESTONE_STATUS.APPROVED;
    milestone.approvedAt = new Date().toISOString();
    milestone.approvedBy = req.user.id;

    res.json({
      message: 'Milestone approved. Ready for payment release.',
      milestone: {
        id: milestone.id,
        title: milestone.title,
        status: milestone.status,
        approvedAt: milestone.approvedAt
      }
    });
  } catch (error) {
    console.error('Milestone approval error:', error);
    res.status(500).json({ message: 'Failed to approve milestone', error: error.message });
  }
});

// Reject milestone
router.post('/milestones/:milestoneId/reject', (req, res) => {
  try {
    const { milestoneId } = req.params;
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({ message: 'Rejection reason required' });
    }

    const milestone = milestones.find(m => m.id === milestoneId);

    if (!milestone) {
      return res.status(404).json({ message: 'Milestone not found' });
    }

    if (milestone.status !== MILESTONE_STATUS.SUBMITTED) {
      return res.status(400).json({ 
        message: `Milestone is ${milestone.status}, cannot reject` 
      });
    }

    // Update milestone
    milestone.status = MILESTONE_STATUS.REJECTED;
    milestone.rejectedAt = new Date().toISOString();
    milestone.rejectedBy = req.user.id;
    milestone.rejectionReason = reason;

    // Provider can resubmit

    res.json({
      message: 'Milestone rejected',
      milestone: {
        id: milestone.id,
        title: milestone.title,
        status: milestone.status,
        rejectionReason: reason
      }
    });
  } catch (error) {
    console.error('Milestone rejection error:', error);
    res.status(500).json({ message: 'Failed to reject milestone', error: error.message });
  }
});

// ========== PROVIDER MANAGEMENT ==========

// Get all providers (with filters)
router.get('/providers', (req, res) => {
  try {
    const { state, verified, serviceCategory } = req.query;

    let filtered = [...providers];

    if (state) {
      filtered = filtered.filter(p => p.state === state);
    }

    if (verified !== undefined) {
      filtered = filtered.filter(p => p.verified === (verified === 'true'));
    }

    if (serviceCategory) {
      filtered = filtered.filter(p => p.serviceCategory === serviceCategory);
    }

    // Remove passwords
    const safe = filtered.map(p => {
      const { password, emailVerificationToken, ...safeProvider } = p;
      return safeProvider;
    });

    res.json({
      count: safe.length,
      providers: safe
    });
  } catch (error) {
    console.error('Get providers error:', error);
    res.status(500).json({ message: 'Failed to fetch providers', error: error.message });
  }
});

// Publish provider (make visible in directory)
router.post('/providers/:providerId/publish', (req, res) => {
  try {
    const { providerId } = req.params;

    const provider = providers.find(p => p.id === providerId);

    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    if (provider.state !== PROVIDER_STATES.VERIFIED) {
      return res.status(400).json({ 
        message: 'Provider must be verified first',
        currentState: provider.state
      });
    }

    provider.state = PROVIDER_STATES.PUBLISHED;
    provider.publishedAt = new Date().toISOString();
    provider.updatedAt = new Date().toISOString();

    res.json({
      message: 'Provider published successfully',
      provider: {
        id: provider.id,
        name: provider.name,
        businessName: provider.businessName,
        state: provider.state
      }
    });
  } catch (error) {
    console.error('Publish provider error:', error);
    res.status(500).json({ message: 'Failed to publish provider', error: error.message });
  }
});

// Suspend user/provider
router.post('/users/:userId/suspend', (req, res) => {
  try {
    const { userId } = req.params;
    const { reason } = req.body;

    let user = users.find(u => u.id === userId);
    let isProvider = false;

    if (!user) {
      user = providers.find(p => p.id === userId);
      isProvider = true;
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.state = isProvider ? PROVIDER_STATES.SUSPENDED : USER_STATES.SUSPENDED;
    user.suspendedAt = new Date().toISOString();
    user.suspensionReason = reason || 'No reason provided';
    user.updatedAt = new Date().toISOString();

    res.json({
      message: 'User suspended',
      user: {
        id: user.id,
        name: user.name,
        state: user.state,
        reason: user.suspensionReason
      }
    });
  } catch (error) {
    console.error('Suspend user error:', error);
    res.status(500).json({ message: 'Failed to suspend user', error: error.message });
  }
});

// ========== DASHBOARD STATS ==========

// Get admin dashboard stats
router.get('/stats', (req, res) => {
  try {
    const stats = {
      users: {
        total: users.length,
        verified: users.filter(u => u.state === USER_STATES.VERIFIED).length,
        pendingKyc: users.filter(u => u.state === USER_STATES.KYC_PENDING).length
      },
      providers: {
        total: providers.length,
        verified: providers.filter(p => p.state === PROVIDER_STATES.VERIFIED || p.state === PROVIDER_STATES.PUBLISHED).length,
        published: providers.filter(p => p.state === PROVIDER_STATES.PUBLISHED).length,
        pendingKyc: providers.filter(p => p.state === PROVIDER_STATES.KYC_REVIEW).length
      },
      kyc: {
        pending: kycRecords.filter(k => k.status === KYC_STATUS.PENDING).length,
        approved: kycRecords.filter(k => k.status === KYC_STATUS.APPROVED).length,
        rejected: kycRecords.filter(k => k.status === KYC_STATUS.REJECTED).length
      },
      contracts: {
        total: contracts.length,
        active: contracts.filter(c => c.status === 'IN_PROGRESS').length
      },
      milestones: {
        pendingApproval: milestones.filter(m => m.status === MILESTONE_STATUS.SUBMITTED).length,
        approved: milestones.filter(m => m.status === MILESTONE_STATUS.APPROVED).length,
        paid: milestones.filter(m => m.status === MILESTONE_STATUS.PAID).length
      },
      escrow: {
        totalHeld: escrowLedger
          .filter(e => e.status === ESCROW_STATUS.HELD)
          .reduce((sum, e) => sum + e.amount, 0),
        totalReleased: escrowLedger
          .filter(e => e.status === ESCROW_STATUS.COMPLETED)
          .reduce((sum, e) => sum + e.amount, 0)
      }
    };

    res.json(stats);
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Failed to fetch stats', error: error.message });
  }
});

export default router;
