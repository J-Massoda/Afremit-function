import React, { useState } from 'react';
import Card from '../../../components/shared/Card';
import Button from '../../../components/shared/Button';
import Badge from '../../../components/shared/Badge';
import Icon from '../../../components/shared/Icon';
import {
  mockInstitutions
} from '../../../mock/educationEscrow';

/**
 * INSTITUTION MANAGEMENT MODULE
 * Admin interface for managing educational institutions
 */
const InstitutionManagement = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [editingFee, setEditingFee] = useState(null);

  const filteredInstitutions = mockInstitutions.filter(inst =>
    selectedStatus === 'all' || inst.status === selectedStatus
  );

  const handleAdjustFee = (institutionId, newFee) => {
    alert(`Institution ${institutionId} fee adjusted to ${newFee}%`);
    setEditingFee(null);
  };

  const handlePauseSettlement = (institutionId) => {
    alert(`Settlement paused for institution ${institutionId}`);
  };

  const handleApproveInstitution = (institutionId) => {
    alert(`Institution ${institutionId} approved and activated`);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container-custom py-6">
          <h1 className="text-3xl font-bold text-primary mb-2">Institution Management</h1>
          <p className="text-neutral-600">Manage educational institutions and settlement accounts</p>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="text-center">
              <p className="text-sm text-neutral-600 mb-1">Total Institutions</p>
              <p className="text-3xl font-bold text-primary">{mockInstitutions.length}</p>
            </div>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <div className="text-center">
              <p className="text-sm text-neutral-600 mb-1">Active</p>
              <p className="text-3xl font-bold text-green-600">
                {mockInstitutions.filter(i => i.status === 'active').length}
              </p>
            </div>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200">
            <div className="text-center">
              <p className="text-sm text-neutral-600 mb-1">Pending Approval</p>
              <p className="text-3xl font-bold text-yellow-600">
                {mockInstitutions.filter(i => i.status === 'pending').length}
              </p>
            </div>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <div className="text-center">
              <p className="text-sm text-neutral-600 mb-1">Total Settled</p>
              <p className="text-3xl font-bold text-blue-600">
                ${mockInstitutions.reduce((sum, i) => sum + i.total_settled, 0).toFixed(0)}
              </p>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <div className="flex gap-2">
            <Button
              variant={selectedStatus === 'all' ? 'primary' : 'outline'}
              onClick={() => setSelectedStatus('all')}
            >
              All Institutions
            </Button>
            <Button
              variant={selectedStatus === 'active' ? 'success' : 'outline'}
              onClick={() => setSelectedStatus('active')}
            >
              Active
            </Button>
            <Button
              variant={selectedStatus === 'pending' ? 'warning' : 'outline'}
              onClick={() => setSelectedStatus('pending')}
            >
              Pending Approval
            </Button>
          </div>
        </Card>

        {/* Institutions List */}
        <div className="space-y-6">
          {filteredInstitutions.map((institution) => (
            <Card key={institution.institution_id} className="border-l-4 border-primary">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-primary">{institution.name}</h3>
                    <Badge variant={institution.status === 'active' ? 'success' : 'warning'}>
                      {institution.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-neutral-600">
                    <div className="flex items-center gap-2">
                      <Icon name="location" className="w-4 h-4" />
                      <span>{institution.country}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="building" className="w-4 h-4" />
                      <span>{institution.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="users" className="w-4 h-4" />
                      <span>{institution.registered_students.length} Students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="shield" className="w-4 h-4" />
                      <span>ID: {institution.institution_id}</span>
                    </div>
                  </div>
                </div>

                {/* AI Match Accuracy */}
                <div className="text-right">
                  <div className="text-2xl font-bold text-secondary mb-1">
                    {institution.ai_match_accuracy_score}%
                  </div>
                  <p className="text-xs text-neutral-500">AI Accuracy</p>
                </div>
              </div>

              {/* Financial Details */}
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {/* Platform Fee */}
                <div className="bg-primary-50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-primary mb-3">Platform Fee</h4>
                  {editingFee === institution.institution_id ? (
                    <div className="space-y-2">
                      <input
                        type="number"
                        step="0.1"
                        min="1.0"
                        max="1.5"
                        defaultValue={institution.fee_rate}
                        className="w-full px-3 py-2 border border-neutral-300 rounded"
                        id={`fee-${institution.institution_id}`}
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="success"
                          onClick={() => {
                            const newFee = document.getElementById(`fee-${institution.institution_id}`).value;
                            handleAdjustFee(institution.institution_id, newFee);
                          }}
                          className="flex-1"
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingFee(null)}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="text-2xl font-bold text-primary mb-2">
                        {institution.fee_rate}%
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingFee(institution.institution_id)}
                      >
                        Adjust Fee
                      </Button>
                    </>
                  )}
                </div>

                {/* Total Settled */}
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-green-700 mb-2">Total Settled</h4>
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    ${institution.total_settled.toFixed(2)}
                  </div>
                  <p className="text-xs text-neutral-600">
                    {institution.settlement_history.length} settlements
                  </p>
                </div>

                {/* Settlement Account */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-blue-700 mb-2">Settlement Account</h4>
                  <p className="text-sm font-mono text-blue-600 mb-2">
                    {institution.settlement_account}
                  </p>
                  <Badge variant="success" size="sm">Verified</Badge>
                </div>
              </div>

              {/* Settlement History */}
              {institution.settlement_history.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-neutral-700 mb-3">Recent Settlements</h4>
                  <div className="bg-neutral-50 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-neutral-200">
                      <thead className="bg-neutral-100">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-semibold text-neutral-600">Date</th>
                          <th className="px-4 py-2 text-right text-xs font-semibold text-neutral-600">Gross</th>
                          <th className="px-4 py-2 text-right text-xs font-semibold text-neutral-600">Fee</th>
                          <th className="px-4 py-2 text-right text-xs font-semibold text-neutral-600">Net</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-200">
                        {institution.settlement_history.map((settlement, idx) => (
                          <tr key={idx} className="hover:bg-neutral-100">
                            <td className="px-4 py-2 text-sm text-neutral-700">
                              {new Date(settlement.date).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-2 text-sm text-right font-semibold text-primary">
                              ${settlement.amount.toFixed(2)}
                            </td>
                            <td className="px-4 py-2 text-sm text-right text-red-600">
                              -${settlement.fee.toFixed(2)}
                            </td>
                            <td className="px-4 py-2 text-sm text-right font-bold text-green-600">
                              ${settlement.net.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-neutral-200">
                {institution.status === 'pending' ? (
                  <>
                    <Button
                      variant="success"
                      className="flex-1"
                      onClick={() => handleApproveInstitution(institution.institution_id)}
                    >
                      <Icon name="check" className="w-4 h-4 mr-2" />
                      Approve & Activate
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Icon name="eye" className="w-4 h-4 mr-2" />
                      Review Documentation
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="primary" className="flex-1">
                      <Icon name="eye" className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Icon name="chart" className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                    <Button
                      variant="warning"
                      className="flex-1"
                      onClick={() => handlePauseSettlement(institution.institution_id)}
                    >
                      <Icon name="pause" className="w-4 h-4 mr-2" />
                      Pause Settlements
</Button>
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstitutionManagement;
