import React, { useState } from 'react';
import Card from '../../../components/shared/Card';
import Button from '../../../components/shared/Button';
import Badge from '../../../components/shared/Badge';
import Icon from '../../../components/shared/Icon';
import {
  mockEscrowTransactions,
  getTransactionsByStatus
} from '../../../mock/educationEscrow';

/**
 * ESCROW MONITOR MODULE
 * Real-time tracking of all escrow transactions through lifecycle
 */
const EscrowMonitor = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = mockEscrowTransactions.filter(txn => {
    const matchesStatus = statusFilter === 'all' || txn.escrow_status === statusFilter;
    const matchesSearch = 
      txn.transaction_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.payer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.institution_name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusCounts = {
    escrowed: getTransactionsByStatus('escrowed').length,
    allocated: getTransactionsByStatus('allocated').length,
    released: getTransactionsByStatus('released').length
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'released': return 'success';
      case 'allocated': return 'secondary';
      case 'escrowed': return 'warning';
      default: return 'default';
    }
  };

  const getMatchStatusColor = (status) => {
    switch(status) {
      case 'auto_allocated': return 'success';
      case 'admin_review': return 'warning';
      case 'exception': return 'error';
      default: return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container-custom py-6">
          <h1 className="text-3xl font-bold text-primary mb-2">Escrow Transaction Monitor</h1>
          <p className="text-neutral-600">Real-time tracking of all escrow transactions through lifecycle</p>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="text-center">
              <p className="text-sm opacity-90 mb-1">Total Transactions</p>
              <p className="text-4xl font-bold">{mockEscrowTransactions.length}</p>
            </div>
          </Card>

          <Card className="border-l-4 border-yellow-500">
            <div className="text-center">
              <p className="text-sm text-neutral-600 mb-1">Escrowed</p>
              <p className="text-3xl font-bold text-yellow-600">{statusCounts.escrowed}</p>
              <p className="text-xs text-neutral-500 mt-1">Awaiting allocation</p>
            </div>
          </Card>

          <Card className="border-l-4 border-blue-500">
            <div className="text-center">
              <p className="text-sm text-neutral-600 mb-1">Allocated</p>
              <p className="text-3xl font-bold text-blue-600">{statusCounts.allocated}</p>
              <p className="text-xs text-neutral-500 mt-1">Pending release</p>
            </div>
          </Card>

          <Card className="border-l-4 border-green-500">
            <div className="text-center">
              <p className="text-sm text-neutral-600 mb-1">Released</p>
              <p className="text-3xl font-bold text-green-600">{statusCounts.released}</p>
              <p className="text-xs text-neutral-500 mt-1">Completed</p>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by transaction ID, payer, or institution..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'primary' : 'outline'}
                onClick={() => setStatusFilter('all')}
              >
                All
              </Button>
              <Button
                variant={statusFilter === 'escrowed' ? 'warning' : 'outline'}
                onClick={() => setStatusFilter('escrowed')}
              >
                Escrowed
              </Button>
              <Button
                variant={statusFilter === 'allocated' ? 'secondary' : 'outline'}
                onClick={() => setStatusFilter('allocated')}
              >
                Allocated
              </Button>
              <Button
                variant={statusFilter === 'released' ? 'success' : 'outline'}
                onClick={() => setStatusFilter('released')}
              >
                Released
              </Button>
            </div>
          </div>
        </Card>

        {/* Transactions List */}
        <div className="space-y-4">
          {filteredTransactions.map((txn) => (
            <Card key={txn.transaction_id} className="hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-primary">{txn.transaction_id}</h3>
                    <Badge variant={getStatusColor(txn.escrow_status)}>
                      {txn.escrow_status.toUpperCase()}
                    </Badge>
                    <Badge variant={getMatchStatusColor(txn.match_status)}>
                      {txn.match_status === 'auto_allocated' ? 'AUTO' :
                       txn.match_status === 'admin_review' ? 'REVIEW' : 'EXCEPTION'}
                    </Badge>
                  </div>
                  <div className="grid md:grid-cols-2 gap-2 text-sm text-neutral-600">
                    <div>
                      <span className="font-semibold">Payer:</span> {txn.payer_name} ({txn.payer_id})
                    </div>
                    <div>
                      <span className="font-semibold">Institution:</span> {txn.institution_name}
                    </div>
                    {txn.student_name && (
                      <div>
                        <span className="font-semibold">Student:</span> {txn.student_name} ({txn.student_id})
                      </div>
                    )}
                    {txn.invoice_number && (
                      <div>
                        <span className="font-semibold">Invoice:</span> {txn.invoice_number}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary mb-1">${txn.gross_amount.toFixed(2)}</p>
                  <p className="text-xs text-neutral-500">Gross Amount</p>
                </div>
              </div>

              {/* Transaction Flow */}
              <div className="bg-neutral-50 rounded-lg p-4 mb-4">
                <h4 className="text-sm font-semibold text-neutral-700 mb-3">Transaction Lifecycle</h4>
                <div className="flex items-center justify-between">
                  <div className="flex-1 text-center">
                    <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${
                      txn.payment_date ? 'bg-green-500' : 'bg-neutral-300'
                    }`}>
                      <Icon name="check" className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-xs font-semibold">Received</p>
                    {txn.payment_date && (
                      <p className="text-xs text-neutral-500">
                        {new Date(txn.payment_date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="w-16 h-1 bg-neutral-300" />
                  <div className="flex-1 text-center">
                    <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${
                      txn.allocation_date ? 'bg-green-500' : 'bg-neutral-300'
                    }`}>
                      <Icon name="check" className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-xs font-semibold">Allocated</p>
                    {txn.allocation_date && (
                      <p className="text-xs text-neutral-500">
                        {new Date(txn.allocation_date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="w-16 h-1 bg-neutral-300" />
                  <div className="flex-1 text-center">
                    <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${
                      txn.release_date ? 'bg-green-500' : 'bg-neutral-300'
                    }`}>
                      <Icon name="check" className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-xs font-semibold">Released</p>
                    {txn.release_date && (
                      <p className="text-xs text-neutral-500">
                        {new Date(txn.release_date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div className="bg-blue-50 rounded p-3">
                  <p className="text-xs text-neutral-600 mb-1">Invoice Amount</p>
                  <p className="text-lg font-bold text-blue-600">${txn.invoice_amount.toFixed(2)}</p>
                </div>
                <div className="bg-orange-50 rounded p-3">
                  <p className="text-xs text-neutral-600 mb-1">Payer Fee (3%)</p>
                  <p className="text-lg font-bold text-orange-600">${txn.payer_fee.toFixed(2)}</p>
                </div>
                <div className="bg-red-50 rounded p-3">
                  <p className="text-xs text-neutral-600 mb-1">Institution Fee</p>
                  <p className="text-lg font-bold text-red-600">${txn.institution_fee.toFixed(2)}</p>
                </div>
                <div className="bg-green-50 rounded p-3">
                  <p className="text-xs text-neutral-600 mb-1">Net to School</p>
                  <p className="text-lg font-bold text-green-600">${txn.net_to_institution.toFixed(2)}</p>
                </div>
              </div>

              {/* AI Match Score */}
              <div className="flex items-center justify-between p-3 bg-secondary-50 rounded">
                <div className="flex items-center gap-3">
                  <Icon name="cpu" className="w-5 h-5 text-secondary" />
                  <div>
                    <p className="text-sm font-semibold text-secondary">AI Match Score</p>
                    <p className="text-xs text-neutral-600">Confidence: {txn.match_confidence}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-secondary">{txn.match_score}%</div>
                </div>
              </div>

              {/* Flagged Reason */}
              {txn.flagged_reason && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-sm font-semibold text-yellow-800 mb-1">⚠️ Flagged</p>
                  <p className="text-sm text-yellow-700">{txn.flagged_reason}</p>
                </div>
              )}

              {/* Actions */}
              <div className="mt-4 flex gap-3">
                <Button variant="primary" size="sm" className="flex-1">
                  <Icon name="eye" className="w-4 h-4 mr-2" />
                  View Full Details
                </Button>
                {txn.escrow_status !== 'released' && (
                  <Button variant="outline" size="sm" className="flex-1">
                    <Icon name="download" className="w-4 h-4 mr-2" />
                    Export Transaction
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EscrowMonitor;