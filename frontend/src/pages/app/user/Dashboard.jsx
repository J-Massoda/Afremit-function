import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../../../components/shared/Card';
import Button from '../../../components/shared/Button';
import Badge from '../../../components/shared/Badge';
import { contractsAPI } from '../../../services/api';

const Dashboard = () => {
  const [contracts, setContracts] = useState([]);
  const [stats, setStats] = useState({
    active: 0,
    completed: 0,
    totalAmount: 0,
    inEscrow: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Mock data for demo
      const mockContracts = [
        {
          id: '1',
          title: 'House Construction - Johannesburg',
          provider: 'ABC Contractors',
          totalAmount: 500000,
          escrowBalance: 300000,
          status: 'in_progress',
          progress: 60,
          milestones: 5,
          completedMilestones: 3,
          createdAt: '2025-01-10'
        },
        {
          id: '2',
          title: 'Office Renovation - Cape Town',
          provider: 'XYZ Builders',
          totalAmount: 250000,
          escrowBalance: 250000,
          status: 'pending',
          progress: 0,
          milestones: 3,
          completedMilestones: 0,
          createdAt: '2025-01-14'
        }
      ];

      setContracts(mockContracts);
      setStats({
        active: mockContracts.filter(c => c.status === 'in_progress').length,
        completed: 0,
        totalAmount: mockContracts.reduce((sum, c) => sum + c.totalAmount, 0),
        inEscrow: mockContracts.reduce((sum, c) => sum + c.escrowBalance, 0)
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching contracts:', error);
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      in_progress: 'info',
      completed: 'success',
      cancelled: 'danger'
    };
    return <Badge variant={variants[status]}>{status.replace('_', ' ')}</Badge>;
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Welcome Back! 👋</h1>
        <p className="text-neutral-600">Manage your construction projects and payments</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Active Contracts', value: stats.active, icon: '📄', color: 'secondary' },
          { label: 'Completed Projects', value: stats.completed, icon: '✅', color: 'success' },
          { label: 'Total Value', value: `R${stats.totalAmount.toLocaleString()}`, icon: '💰', color: 'accent' },
          { label: 'In Escrow', value: `R${stats.inEscrow.toLocaleString()}`, icon: '🔒', color: 'primary' }
        ].map((stat, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                </div>
                <div className="text-4xl">{stat.icon}</div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Button to="/client/create-contract" variant="primary">
            ➕ Create New Contract
          </Button>
          <Button variant="outline">
            📊 View All Contracts
          </Button>
          <Button variant="ghost">
            👥 Find Service Providers
          </Button>
        </div>
      </Card>

      {/* Recent Contracts */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Your Contracts</h2>
          <Link to="/client/contracts" className="text-secondary hover:underline">
            View All →
          </Link>
        </div>

        {loading ? (
          <Card><p className="text-center text-neutral-600">Loading...</p></Card>
        ) : contracts.length === 0 ? (
          <Card className="text-center py-12">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-xl font-bold mb-2">No Contracts Yet</h3>
            <p className="text-neutral-600 mb-6">Start by creating your first construction contract</p>
            <Button to="/client/create-contract" variant="primary">
              Create Contract
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {contracts.map((contract) => (
              <Card key={contract.id} hoverable clickable>
                <Link to={`/client/contract/${contract.id}`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-lg">{contract.title}</h4>
                        {getStatusBadge(contract.status)}
                      </div>
                      <p className="text-sm text-neutral-600 mb-3">
                        Provider: {contract.provider} | Created: {contract.createdAt}
                      </p>
                      <div className="flex items-center gap-6 text-sm">
                        <div>
                          <span className="text-neutral-600">Progress:</span>
                          <span className="font-semibold ml-2">{contract.progress}%</span>
                        </div>
                        <div>
                          <span className="text-neutral-600">Milestones:</span>
                          <span className="font-semibold ml-2">{contract.completedMilestones}/{contract.milestones}</span>
                        </div>
                        <div>
                          <span className="text-neutral-600">Total:</span>
                          <span className="font-semibold ml-2">R{contract.totalAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
