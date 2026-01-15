import React, { useState } from 'react';
import Card from '../../../components/shared/Card';
import Button from '../../../components/shared/Button';
import Badge from '../../../components/shared/Badge';

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
      <h1 className="text-4xl font-bold text-primary mb-8">Admin Dashboard 👨‍💼</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Users', value: '1,234', icon: '👥' },
          { label: 'Active Contracts', value: '45', icon: '📄' },
          { label: 'Total Escrow', value: 'R12.5M', icon: '💰' },
          { label: 'Pending Approvals', value: '8', icon: '⏳' }
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
                  <Button size="sm" variant="primary" onClick={() => handleApproveProvider(provider.id)}>
                    ✅ Approve
                  </Button>
                  <Button size="sm" variant="outline">
                    ❌ Reject
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
