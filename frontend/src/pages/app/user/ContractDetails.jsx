import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../../../components/shared/Card';
import Button from '../../../components/shared/Button';
import Badge from '../../../components/shared/Badge';
import ProgressBar from '../../../components/shared/ProgressBar';
import Modal from '../../../components/shared/Modal';
import Icon from '../../../components/shared/Icon';

const ContractDetails = () => {
  const { id } = useParams();
  const [contract, setContract] = useState(null);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);

  useEffect(() => {
    // Mock contract data
    setContract({
      id: '1',
      title: 'House Construction - Johannesburg',
      description: 'Complete house construction including foundation, structure, roofing, and finishing.',
      provider: {
        name: 'ABC Contractors',
        email: 'contact@abc.com',
        phone: '+27 123 456 789',
        rating: 5
      },
      totalAmount: 500000,
      escrowBalance: 300000,
      releasedAmount: 200000,
      status: 'in_progress',
      progress: 60,
      startDate: '2025-01-10',
      endDate: '2025-06-10',
      milestones: [
        { id: 1, title: 'Foundation & Excavation', amount: 100000, status: 'approved', completedDate: '2025-01-15' },
        { id: 2, title: 'Walls & Structure', amount: 150000, status: 'approved', completedDate: '2025-01-25' },
        { id: 3, title: 'Roofing', amount: 100000, status: 'submitted', submitDate: '2025-01-30' },
        { id: 4, title: 'Electrical & Plumbing', amount: 100000, status: 'pending' },
        { id: 5, title: 'Finishing & Painting', amount: 50000, status: 'pending' }
      ]
    });
  }, [id]);

  const handleApproveMilestone = () => {
    console.log('Approving milestone:', selectedMilestone);
    setShowApprovalModal(false);
    alert('Milestone approved! Payment released. (Demo)');
  };

  if (!contract) {
    return <Card><p className="text-center">Loading...</p></Card>;
  }

  const getMilestoneStatusBadge = (status) => {
    const variants = {
      pending: { variant: 'warning', label: 'Pending' },
      submitted: { variant: 'info', label: 'Awaiting Approval' },
      approved: { variant: 'success', label: 'Completed' },
      rejected: { variant: 'danger', label: 'Rejected' }
    };
    const config = variants[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-4xl font-bold text-primary">{contract.title}</h1>
          <Badge variant="info">{contract.status.replace('_', ' ')}</Badge>
        </div>
        <p className="text-neutral-600">{contract.description}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Value', value: `R${contract.totalAmount.toLocaleString()}`, icon: 'money' },
          { label: 'In Escrow', value: `R${contract.escrowBalance.toLocaleString()}`, icon: 'lock' },
          { label: 'Released', value: `R${contract.releasedAmount.toLocaleString()}`, icon: 'check' },
          { label: 'Progress', value: `${contract.progress}%`, icon: 'chart' }
        ].map((stat, index) => (
          <Card key={index}>
            <div className="text-center">
              <div className="mb-2 flex justify-center">
                <Icon name={stat.icon} className="w-8 h-8 text-primary" />
              </div>
              <p className="text-sm text-neutral-600">{stat.label}</p>
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overall Progress */}
          <Card>
            <h3 className="text-xl font-bold mb-4">Project Progress</h3>
            <ProgressBar percentage={contract.progress} color="secondary" />
            <div className="mt-4 flex items-center justify-between text-sm text-neutral-600">
              <span>Start: {contract.startDate}</span>
              <span>End: {contract.endDate}</span>
            </div>
          </Card>

          {/* Milestones */}
          <Card>
            <h3 className="text-xl font-bold mb-6">Milestones</h3>
            <div className="space-y-4">
              {contract.milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-2 border-neutral-200 rounded-lg p-4 hover:border-secondary transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                        milestone.status === 'approved' ? 'bg-success' :
                        milestone.status === 'submitted' ? 'bg-secondary' : 'bg-neutral-300'
                      }`}>
                        {milestone.status === 'approved' ? '✓' : index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold mb-1">{milestone.title}</h4>
                        {getMilestoneStatusBadge(milestone.status)}
                      </div>
                    </div>
                    <p className="font-bold text-secondary">R{milestone.amount.toLocaleString()}</p>
                  </div>

                  {milestone.status === 'submitted' && (
                    <div className="mt-4 flex gap-2">
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => {
                          setSelectedMilestone(milestone);
                          setShowApprovalModal(true);
                        }}
                      >
                        Review & Approve
                      </Button>
                      <Button size="sm" variant="outline">
                        Request Changes
                      </Button>
                    </div>
                  )}

                  {milestone.completedDate && (
                    <p className="text-xs text-neutral-500 mt-2">
                      Completed: {milestone.completedDate}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Provider Info */}
          <Card>
            <h3 className="text-xl font-bold mb-4">Service Provider</h3>
            <div className="space-y-3">
              <div>
                <p className="font-bold text-lg">{contract.provider.name}</p>
                <div className="flex items-center gap-1 text-accent mt-1">
                  {'★'.repeat(contract.provider.rating)}
                  <span className="text-neutral-600 text-sm ml-1">({contract.provider.rating}.0)</span>
                </div>
              </div>
              <div className="text-sm text-neutral-600">
                <p className="flex items-center gap-2"><Icon name="mail" className="w-4 h-4" /> {contract.provider.email}</p>
                <p className="flex items-center gap-2"><Icon name="phone" className="w-4 h-4" /> {contract.provider.phone}</p>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Message Provider
              </Button>
            </div>
          </Card>

          {/* Actions */}
          <Card>
            <h3 className="text-xl font-bold mb-4">Actions</h3>
            <div className="space-y-2">
              <Button variant="secondary" size="sm" className="w-full flex items-center justify-center gap-2">
                <Icon name="chat" className="w-4 h-4" /> Contact Support
              </Button>
              <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-2">
                <Icon name="document" className="w-4 h-4" /> Download Contract
              </Button>
              <Button variant="ghost" size="sm" className="w-full text-danger flex items-center justify-center gap-2">
                <Icon name="warning" className="w-4 h-4" /> Report Issue
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Approval Modal */}
      <Modal
        isOpen={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        title="Approve Milestone"
        size="md"
      >
        {selectedMilestone && (
          <div>
            <h4 className="font-bold mb-2">{selectedMilestone.title}</h4>
            <p className="text-neutral-600 mb-4">Amount: R{selectedMilestone.amount.toLocaleString()}</p>

            <div className="bg-accent-50 border-2 border-accent rounded-lg p-4 mb-6">
              <p className="font-semibold text-accent-900 mb-2 flex items-center gap-2">
                <Icon name="warning" className="w-5 h-5" /> Approval Confirmation
              </p>
              <p className="text-sm text-neutral-700">
                By approving this milestone, R{selectedMilestone.amount.toLocaleString()} will be immediately 
                released from escrow to the service provider. This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowApprovalModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={handleApproveMilestone}
              >
                Approve & Release Payment
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ContractDetails;
