import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../components/shared/Card';
import Badge from '../../../components/shared/Badge';

const ProviderDashboard = () => {
  const [stats, setStats] = useState({
    activeContracts: 2,
    completedMilestones: 5,
    totalEarnings: 200000,
    pendingPayments: 100000
  });

  return (
    <div>
      <h1 className="text-4xl font-bold text-primary mb-8">Provider Dashboard 👷</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Active Contracts', value: stats.activeContracts, icon: '📄' },
          { label: 'Completed Milestones', value: stats.completedMilestones, icon: '✅' },
          { label: 'Total Earnings', value: `R${stats.totalEarnings.toLocaleString()}`, icon: '💰' },
          { label: 'Pending Payments', value: `R${stats.pendingPayments.toLocaleString()}`, icon: '⏳' }
        ].map((stat, index) => (
          <Card key={index}>
            <div className="text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <p className="text-sm text-neutral-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Assigned Contracts */}
      <Card>
        <h3 className="text-2xl font-bold mb-6">Your Assigned Contracts</h3>
        <div className="space-y-4">
          {[
            { id: 1, title: 'House Construction - Johannesburg', client: 'John Doe', status: 'in_progress', nextMilestone: 'Roofing' },
            { id: 2, title: 'Office Renovation - Cape Town', client: 'ABC Corp', status: 'pending', nextMilestone: 'Foundation' }
          ].map((contract) => (
            <div key={contract.id} className="p-4 border-2 border-neutral-200 rounded-lg hover:border-secondary transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold mb-1">{contract.title}</h4>
                  <p className="text-sm text-neutral-600">Client: {contract.client}</p>
                  <p className="text-sm text-secondary">Next: {contract.nextMilestone}</p>
                </div>
                <Badge variant={contract.status === 'in_progress' ? 'info' : 'warning'}>
                  {contract.status.replace('_', ' ')}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ProviderDashboard;
