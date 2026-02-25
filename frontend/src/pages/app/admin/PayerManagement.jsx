import React, { useState } from 'react';
import Card from '../../../components/shared/Card';
import Button from '../../../components/shared/Button';
import Badge from '../../../components/shared/Badge';
import Icon from '../../../components/shared/Icon';
import {
  mockPayers,
  getPayersByRiskStatus
} from '../../../mock/educationEscrow';

/**
 * PAYER MANAGEMENT MODULE
 * Admin interface for managing diaspora payers
 */
const PayerManagement = () => {
  const [selectedRiskFilter, setSelectedRiskFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPayers = mockPayers.filter(payer => {
    const matchesRisk = selectedRiskFilter === 'all' || payer.risk_status === selectedRiskFilter;
    const matchesSearch = payer.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payer.country.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRisk && matchesSearch;
  });

  const riskStats = {
    low: getPayersByRiskStatus('low').length,
    medium: getPayersByRiskStatus('medium').length,
    high: getPayersByRiskStatus('high').length,
    review: getPayersByRiskStatus('review').length
  };

  const handleFreezePayer = (payerId) => {
    alert(`Payer ${payerId} frozen. All future payments will be held for review.`);
  };

  const handleApprovePayment = (payerId) => {
    alert(`Flagged payments for ${payerId} approved.`);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container-custom py-6">
          <h1 className="text-3xl font-bold text-primary mb-2">Diaspora Payer Management</h1>
          <p className="text-neutral-600">Monitor and manage international payers with AI risk scoring</p>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Risk Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 mb-1">Low Risk</p>
                <p className="text-3xl font-bold text-green-600">{riskStats.low}</p>
              </div>
              <Icon name="check" className="w-10 h-10 text-green-500 opacity-50" />
            </div>
          </Card>

          <Card className="border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 mb-1">Medium Risk</p>
                <p className="text-3xl font-bold text-yellow-600">{riskStats.medium}</p>
              </div>
              <Icon name="alert" className="w-10 h-10 text-yellow-500 opacity-50" />
            </div>
          </Card>

          <Card className="border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 mb-1">High Risk</p>
                <p className="text-3xl font-bold text-red-600">{riskStats.high}</p>
              </div>
              <Icon name="alert" className="w-10 h-10 text-red-500 opacity-50" />
            </div>
          </Card>

          <Card className="border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 mb-1">Under Review</p>
                <p className="text-3xl font-bold text-blue-600">{riskStats.review}</p>
              </div>
              <Icon name="clock" className="w-10 h-10 text-blue-500 opacity-50" />
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name or country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedRiskFilter === 'all' ? 'primary' : 'outline'}
                onClick={() => setSelectedRiskFilter('all')}
              >
                All
              </Button>
              <Button
                variant={selectedRiskFilter === 'high' ? 'error' : 'outline'}
                onClick={() => setSelectedRiskFilter('high')}
              >
                High Risk
              </Button>
              <Button
                variant={selectedRiskFilter === 'medium' ? 'warning' : 'outline'}
                onClick={() => setSelectedRiskFilter('medium')}
              >
                Medium
              </Button>
              <Button
                variant={selectedRiskFilter === 'low' ? 'success' : 'outline'}
                onClick={() => setSelectedRiskFilter('low')}
              >
                Low Risk
              </Button>
            </div>
          </div>
        </Card>

        {/* Payers List */}
        <Card>
          <h3 className="text-xl font-bold text-primary mb-6">
            Payers ({filteredPayers.length})
          </h3>
          <div className="space-y-4">
            {filteredPayers.map((payer) => (
              <div key={payer.payer_id} className="border border-neutral-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-bold text-primary">{payer.full_name}</h4>
                      <Badge
                        variant={
                          payer.risk_status === 'low' ? 'success' :
                          payer.risk_status === 'medium' ? 'warning' :
                          payer.risk_status === 'high' ? 'error' : 'default'
                        }
                      >
                        {payer.risk_status.toUpperCase()} RISK
                      </Badge>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2 text-sm text-neutral-600">
                      <div className="flex items-center gap-2">
                        <Icon name="location" className="w-4 h-4" />
                        <span>{payer.country}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="mail" className="w-4 h-4" />
                        <span>{payer.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="phone" className="w-4 h-4" />
                        <span>{payer.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="users" className="w-4 h-4" />
                        <span>{payer.linked_students.length} Linked Students</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {payer.risk_score}
                    </div>
                    <p className="text-xs text-neutral-500">Risk Score</p>
                  </div>
                </div>

                {/* Payment History Summary */}
                <div className="bg-neutral-50 rounded-lg p-4 mb-4">
                  <h5 className="text-sm font-semibold text-neutral-700 mb-2">Payment History</h5>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-lg font-bold text-primary">{payer.payment_history.length}</p>
                      <p className="text-xs text-neutral-600">Total Payments</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-green-600">${payer.total_paid}</p>
                      <p className="text-xs text-neutral-600">Amount Paid</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-secondary">
                        {payer.payment_history.filter(p => p.status === 'completed').length}
                      </p>
                      <p className="text-xs text-neutral-600">Successful</p>
                    </div>
                  </div>
                </div>

                {/* Recent Payments */}
                {payer.payment_history.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-sm font-semibold text-neutral-700 mb-2">Recent Payments</h5>
                    <div className="space-y-2">
                      {payer.payment_history.slice(0, 3).map((payment, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <span className="text-neutral-600">
                            {new Date(payment.date).toLocaleDateString()}
                          </span>
                          <span className="font-semibold text-primary">${payment.amount}</span>
                          <Badge
                            variant={
                              payment.status === 'completed' ? 'success' :
                              payment.status === 'pending' ? 'warning' : 'error'
                            }
                            size="sm"
                          >
                            {payment.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Risk Flags */}
                {payer.risk_status !== 'low' && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-yellow-800 font-semibold mb-1">
                      ⚠️ AI Risk Flags:
                    </p>
                    <ul className="text-xs text-yellow-700 space-y-1">
                      {payer.risk_status === 'high' && (
                        <>
                          <li>• Duplicate payments detected</li>
                          <li>• Suspicious transaction pattern</li>
                        </>
                      )}
                      {payer.risk_status === 'medium' && (
                        <li>• Amount mismatch in recent payment</li>
                      )}
                      {payer.risk_status === 'review' && (
                        <li>• New payer - Limited payment history</li>
                      )}
                    </ul>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  <Button variant="primary" size="sm" className="flex-1">
                    <Icon name="eye" className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  {payer.risk_status === 'high' && (
                    <Button
                      variant="error"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleFreezePayer(payer.payer_id)}
                    >
                      <Icon name="lock" className="w-4 h-4 mr-2" />
                      Freeze Account
                    </Button>
                  )}
                  {(payer.risk_status === 'medium' || payer.risk_status === 'review') && (
                    <Button
                      variant="success"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleApprovePayment(payer.payer_id)}
                    >
                      <Icon name="check" className="w-4 h-4 mr-2" />
                      Approve Flagged
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PayerManagement;
