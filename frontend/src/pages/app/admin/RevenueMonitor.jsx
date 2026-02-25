import React, { useState } from 'react';
import Card from '../../../components/shared/Card';
import Button from '../../../components/shared/Button';
import Badge from '../../../components/shared/Badge';
import Icon from '../../../components/shared/Icon';
import {
  mockRevenueRecords,
  mockRevenueSummary,
  mockEscrowTransactions
} from '../../../mock/educationEscrow';

/**
 * REVENUE MONITOR MODULE
 * Track revenue from payer fees and institution fees
 * Revenue moves from Pending → Recognized only after settlement
 */
const RevenueMonitor = () => {
  const [timeFilter, setTimeFilter] = useState('all');

  const recognizedRecords = mockRevenueRecords.filter(r => r.status === 'recognized');
  const pendingRecords = mockRevenueRecords.filter(r => r.status === 'pending');

  // Revenue by source
  const payerFeeRevenue = {
    recognized: recognizedRecords.reduce((sum, r) => sum + r.payer_fee, 0),
    pending: pendingRecords.reduce((sum, r) => sum + r.payer_fee, 0)
  };

  const institutionFeeRevenue = {
    recognized: recognizedRecords.reduce((sum, r) => sum + r.institution_fee, 0),
    pending: pendingRecords.reduce((sum, r) => sum + r.institution_fee, 0)
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="container-custom py-6">
          <h1 className="text-3xl font-bold mb-2">Revenue Monitor</h1>
          <p className="text-green-100">Track revenue from platform fees - Payer fees (2.5-3%) and Institution fees (1-1.5%)</p>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Revenue Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between mb-4">
              <Icon name="money" className="w-10 h-10 opacity-80" />
              <Badge variant="success" className="bg-white/20 text-white border-white/30">
                Recognized
              </Badge>
            </div>
            <p className="text-sm opacity-90 mb-1">Total Recognized Revenue</p>
            <p className="text-3xl font-bold">${mockRevenueSummary.recognized_revenue.toFixed(2)}</p>
            <p className="text-xs opacity-75 mt-2">
              {recognizedRecords.length} settled transactions
            </p>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
            <div className="flex items-center justify-between mb-4">
              <Icon name="clock" className="w-10 h-10 opacity-80" />
              <Badge variant="warning" className="bg-white/20 text-white border-white/30">
                Pending
              </Badge>
            </div>
            <p className="text-sm opacity-90 mb-1">Pending Revenue</p>
            <p className="text-3xl font-bold">${mockRevenueSummary.pending_revenue.toFixed(2)}</p>
            <p className="text-xs opacity-75 mt-2">
              {pendingRecords.length} awaiting settlement
            </p>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between mb-4">
              <Icon name="users" className="w-10 h-10 opacity-80" />
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                2.5-3%
              </Badge>
            </div>
            <p className="text-sm opacity-90 mb-1">Payer Fee Revenue</p>
            <p className="text-3xl font-bold">${mockRevenueSummary.total_payer_fees.toFixed(2)}</p>
            <p className="text-xs opacity-75 mt-2">
              ${payerFeeRevenue.recognized.toFixed(2)} recognized
            </p>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between mb-4">
              <Icon name="building" className="w-10 h-10 opacity-80" />
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                1-1.5%
              </Badge>
            </div>
            <p className="text-sm opacity-90 mb-1">Institution Fee Revenue</p>
            <p className="text-3xl font-bold">${mockRevenueSummary.total_institution_fees.toFixed(2)}</p>
            <p className="text-xs opacity-75 mt-2">
              ${institutionFeeRevenue.recognized.toFixed(2)} recognized
            </p>
          </Card>
        </div>

        {/* Revenue Breakdown */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue by Source */}
          <Card>
            <h3 className="text-xl font-bold text-primary mb-6">Revenue by Source</h3>
            <div className="space-y-6">
              {/* Payer Fees */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon name="users" className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800">Payer Fees</h4>
                      <p className="text-xs text-neutral-500">Diaspora remittance fees (2.5-3%)</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-blue-600">
                      ${mockRevenueSummary.total_payer_fees.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 border border-green-200 rounded p-3">
                    <p className="text-xs text-neutral-600 mb-1">Recognized</p>
                    <p className="text-lg font-bold text-green-600">
                      ${payerFeeRevenue.recognized.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                    <p className="text-xs text-neutral-600 mb-1">Pending</p>
                    <p className="text-lg font-bold text-yellow-600">
                      ${payerFeeRevenue.pending.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Institution Fees */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Icon name="building" className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800">Institution Fees</h4>
                      <p className="text-xs text-neutral-500">School/provider platform fees (1-1.5%)</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-purple-600">
                      ${mockRevenueSummary.total_institution_fees.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 border border-green-200 rounded p-3">
                    <p className="text-xs text-neutral-600 mb-1">Recognized</p>
                    <p className="text-lg font-bold text-green-600">
                      ${institutionFeeRevenue.recognized.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                    <p className="text-xs text-neutral-600 mb-1">Pending</p>
                    <p className="text-lg font-bold text-yellow-600">
                      ${institutionFeeRevenue.pending.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Revenue Recognition Flow */}
          <Card>
            <h3 className="text-xl font-bold text-primary mb-6">Revenue Recognition Flow</h3>
            <div className="space-y-4">
              <div className="bg-neutral-50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-neutral-800">Payment Received</h4>
                    <p className="text-sm text-neutral-600">Funds enter escrow + fees collected</p>
                  </div>
                  <Badge variant="warning">Pending</Badge>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-1 h-8 bg-neutral-300"></div>
              </div>

              <div className="bg-neutral-50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-neutral-800">AI Allocation</h4>
                    <p className="text-sm text-neutral-600">Transaction matched to student</p>
                  </div>
                  <Badge variant="secondary">Processing</Badge>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-1 h-8 bg-neutral-300"></div>
              </div>

              <div className="bg-neutral-50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-neutral-800">Settlement Released</h4>
                    <p className="text-sm text-neutral-600">Funds sent to institution</p>
                  </div>
                  <Badge variant="success">Completed</Badge>
                </div>
              </div>

              <div className="flex justify-center">
                <Icon name="arrow-down" className="w-6 h-6 text-green-500" />
              </div>

              <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Icon name="check" className="w-8 h-8 text-green-600" />
                  <div className="flex-1">
                    <h4 className="font-bold text-green-800">Revenue Recognized</h4>
                    <p className="text-sm text-green-700">
                      Platform fees moved from pending to recognized revenue
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Revenue Records */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-primary">Recent Revenue Records</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Icon name="download" className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="primary" size="sm">
                <Icon name="chart" className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase">
                    Transaction ID
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-600 uppercase">
                    Payer Fee
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-600 uppercase">
                    Institution Fee
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-600 uppercase">
                    Total Revenue
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-neutral-600 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase">
                    Recognized Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 bg-white">
                {mockRevenueRecords.slice(0, 10).map((record) => (
                  <tr key={record.transaction_id} className="hover:bg-neutral-50">
                    <td className="px-4 py-3 text-sm font-medium text-primary">
                      {record.transaction_id}
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-blue-600 font-semibold">
                      ${record.payer_fee.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-purple-600 font-semibold">
                      ${record.institution_fee.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-bold text-green-600">
                      ${record.total_revenue.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge
                        variant={record.status === 'recognized' ? 'success' : 'warning'}
                        size="sm"
                      >
                        {record.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-neutral-600">
                      {record.recognized_date
                        ? new Date(record.recognized_date).toLocaleDateString()
                        : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RevenueMonitor;
