import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../components/shared/Card';
import Button from '../../../components/shared/Button';
import Badge from '../../../components/shared/Badge';
import Icon from '../../../components/shared/Icon';

const AdminDashboard = () => {
  const [providers, setProviders] = useState([
    { id: 1, name: 'XYZ Builders', email: 'xyz@builders.com', status: 'pending', rating: null },
    { id: 2, name: 'Premium Construction', email: 'info@premium.com', status: 'pending', rating: null }
  ]);

  const handleApproveProvider = (id) => {
    alert(`Provider ${id} approved! (Demo)`);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-primary mb-8">Admin Dashboard</h1>

      {/* Service Module Quick Links */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Link to="/admin/education">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-primary-50 to-primary-100 border-2 border-primary-200">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
                <Icon name="building" className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-primary mb-1">Education Escrow</h3>
                <p className="text-sm text-neutral-600">AI-powered payment matching</p>
              </div>
              <Icon name="arrow-right" className="w-6 h-6 text-primary" />
            </div>
          </Card>
        </Link>

        <Card className="bg-neutral-100 border-2 border-dashed border-neutral-300">
          <div className="flex items-center gap-4 opacity-50">
            <div className="w-16 h-16 bg-neutral-300 rounded-xl flex items-center justify-center">
              <Icon name="building" className="w-8 h-8 text-neutral-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-neutral-600 mb-1">Construction Escrow</h3>
              <p className="text-sm text-neutral-500">Coming soon</p>
            </div>
          </div>
        </Card>

        <Card className="bg-neutral-100 border-2 border-dashed border-neutral-300">
          <div className="flex items-center gap-4 opacity-50">
            <div className="w-16 h-16 bg-neutral-300 rounded-xl flex items-center justify-center">
              <Icon name="heart" className="w-8 h-8 text-neutral-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-neutral-600 mb-1">Healthcare Payments</h3>
              <p className="text-sm text-neutral-500">Coming soon</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Users', value: '1,234', icon: 'users' },
          { label: 'Active Contracts', value: '45', icon: 'document' },
          { label: 'Total Escrow', value: 'R12.5M', icon: 'money' },
          { label: 'Pending Approvals', value: '8', icon: 'clock' }
        ].map((stat, index) => (
          <Card key={index}>
            <div className="text-center">
              <div className="mb-2 flex justify-center">
                <Icon name={stat.icon} className="w-10 h-10 text-primary" />
              </div>
              <p className="text-sm text-neutral-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Pending Provider Approvals */}
      <Card>
        <h3 className="text-2xl font-bold mb-6">Pending Provider Approvals</h3>
        <div className="space-y-4">
          {providers.map((provider) => (
            <div key={provider.id} className="p-4 border-2 border-neutral-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold mb-1">{provider.name}</h4>
                  <p className="text-sm text-neutral-600">{provider.email}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="primary" onClick={() => handleApproveProvider(provider.id)} className="flex items-center gap-2">
                    <Icon name="check" className="w-4 h-4" /> Approve
                  </Button>
                  <Button size="sm" variant="outline">
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
