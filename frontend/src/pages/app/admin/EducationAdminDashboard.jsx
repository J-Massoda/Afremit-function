import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../components/shared/Card';
import Button from '../../../components/shared/Button';
import Badge from '../../../components/shared/Badge';
import Icon from '../../../components/shared/Icon';
import {
  mockEscrowTransactions,
  mockPayers,
  mockInstitutions,
  mockAIHealthMetrics,
  mockRevenueSummary,
  mockExceptions,
  getTransactionsByStatus,
  getPayersByRiskStatus
} from '../../../mock/educationEscrow';

/**
 * AFREMIT ADMIN DASHBOARD - EDUCATION ESCROW CONTROL SYSTEM
 * 
 * Main admin dashboard for monitoring education payment escrow system
 * with AI matching, exception handling, and revenue tracking
 */
const EducationAdminDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('all');

  // Calculate real-time stats
  const stats = {
    totalPayers: mockPayers.length,
    activePayers: mockPayers.filter(p => p.risk_status === 'low').length,
    totalInstitutions: mockInstitutions.length,
    activeInstitutions: mockInstitutions.filter(i => i.status === 'active').length,
    totalEscrow: mockEscrowTransactions.reduce((sum, t) => sum + t.gross_amount, 0),
    pendingRelease: getTransactionsByStatus('escrowed').reduce((sum, t) => sum + t.gross_amount, 0),
    pendingExceptions: mockExceptions.length,
    aiMatchAccuracy: mockAIHealthMetrics.match_accuracy,
    recognizedRevenue: mockRevenueSummary.recognized_revenue,
    pendingRevenue: mockRevenueSummary.pending_revenue
  };

  const recentTransactions = mockEscrowTransactions.slice(0, 5);
  const highRiskPayers = getPayersByRiskStatus('high');

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container-custom py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">
                Education Escrow Admin Control
              </h1>
              <p className="text-neutral-600">
                AI-powered payment matching and settlement system
              </p>
            </div>
            <div className="flex gap-3">
              <Badge variant="success" className="px-4 py-2">
                AI Active: {mockAIHealthMetrics.match_accuracy}% Accuracy
              </Badge>
              <Badge variant="warning" className="px-4 py-2">
                {stats.pendingExceptions} Exceptions
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Escrow */}
          <Card className="bg-gradient-to-br from-primary to-primary-600 text-white">
            <div className="flex items-center justify-between mb-4">
              <Icon name="money" className="w-10 h-10 opacity-80" />
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Live
              </Badge>
            </div>
            <p className="text-sm opacity-90 mb-1">Total in Escrow</p>
            <p className="text-3xl font-bold">${stats.totalEscrow.toFixed(2)}</p>
            <p className="text-xs opacity-75 mt-2">
              ${stats.pendingRelease.toFixed(2)} pending release
            </p>
          </Card>

          {/* AI Performance */}
          <Card className="bg-gradient-to-br from-secondary to-secondary-600 text-white">
            <div className="flex items-center justify-between mb-4">
              <Icon name="cpu" className="w-10 h-10 opacity-80" />
              <Badge variant="success" className="bg-white/20 text-white border-white/30">
                {mockAIHealthMetrics.auto_allocated}/{mockAIHealthMetrics.total_transactions}
              </Badge>
            </div>
            <p className="text-sm opacity-90 mb-1">AI Match Accuracy</p>
            <p className="text-3xl font-bold">{stats.aiMatchAccuracy}%</p>
            <p className="text-xs opacity-75 mt-2">
              {mockAIHealthMetrics.avg_allocation_time_ms}ms avg allocation time
            </p>
          </Card>

          {/* Exception Queue */}
          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <div className="flex items-center justify-between mb-4">
              <Icon name="alert" className="w-10 h-10 opacity-80" />
              <Badge variant="error" className="bg-white/20 text-white border-white/30">
                Action Required
              </Badge>
            </div>
            <p className="text-sm opacity-90 mb-1">Exceptions Pending</p>
            <p className="text-3xl font-bold">{stats.pendingExceptions}</p>
            <Link to="/admin/education/exceptions" className="text-xs underline opacity-90 mt-2 inline-block hover:opacity-100">
              View Exception Queue →
            </Link>
          </Card>

          {/* Revenue */}
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between mb-4">
              <Icon name="chart" className="w-10 h-10 opacity-80" />
              <Badge variant="success" className="bg-white/20 text-white border-white/30">
                +${stats.recognizedRevenue.toFixed(0)}
              </Badge>
            </div>
            <p className="text-sm opacity-90 mb-1">Recognized Revenue</p>
            <p className="text-3xl font-bold">${stats.recognizedRevenue.toFixed(2)}</p>
            <p className="text-xs opacity-75 mt-2">
              ${stats.pendingRevenue.toFixed(2)} pending
            </p>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Link to="/admin/education/payers">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-center py-4">
                <Icon name="users" className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-primary">Manage Payers</h3>
                <p className="text-sm text-neutral-600">{stats.totalPayers} total</p>
              </div>
            </Card>
          </Link>

          <Link to="/admin/education/institutions">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-center py-4">
                <Icon name="building" className="w-8 h-8 text-secondary mx-auto mb-2" />
                <h3 className="font-semibold text-secondary">Institutions</h3>
                <p className="text-sm text-neutral-600">{stats.activeInstitutions} active</p>
              </div>
            </Card>
          </Link>

          <Link to="/admin/education/escrow-monitor">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-center py-4">
                <Icon name="shield" className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-primary">Escrow Monitor</h3>
                <p className="text-sm text-neutral-600">{mockEscrowTransactions.length} transactions</p>
              </div>
            </Card>
          </Link>

          <Link to="/admin/education/revenue">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-center py-4">
                <Icon name="chart" className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-green-600">Revenue</h3>
                <p className="text-sm text-neutral-600">${stats.recognizedRevenue.toFixed(0)}</p>
              </div>
            </Card>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Transactions */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-primary">Recent Transactions</h3>
              <Link to="/admin/education/escrow-monitor" className="text-sm text-secondary hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {recentTransactions.map((txn) => (
                <div key={txn.transaction_id} className="border-b border-neutral-200 pb-4 last:border-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-sm">{txn.transaction_id}</h4>
                      <p className="text-sm text-neutral-600">{txn.payer_name} → {txn.institution_name}</p>
                      {txn.student_name && (
                        <p className="text-xs text-neutral-500">Student: {txn.student_name}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">${txn.gross_amount.toFixed(2)}</p>
                      <Badge 
                        variant={
                          txn.match_status === 'auto_allocated' ? 'success' :
                          txn.match_status === 'admin_review' ? 'warning' : 'error'
                        }
                        className="mt-1"
                      >
                        {txn.match_status === 'auto_allocated' ? 'Auto' :
                         txn.match_status === 'admin_review' ? 'Review' : 'Exception'}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-neutral-500">
                    <span>Score: {txn.match_score}%</span>
                    <span>•</span>
                    <span>{new Date(txn.created_at).toLocaleDateString()}</span>
                    <span>•</span>
                    <Badge variant={txn.escrow_status === 'released' ? 'success' : 'warning'} size="sm">
                      {txn.escrow_status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Exception Queue */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-orange-600">Exception Queue</h3>
              <Link to="/admin/education/exceptions" className="text-sm text-secondary hover:underline">
                View All
              </Link>
            </div>
            {mockExceptions.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="check" className="w-16 h-16 text-green-500 mx-auto mb-3" />
                <p className="text-neutral-600">No exceptions - All clear!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {mockExceptions.slice(0, 3).map((exception) => (
                  <div key={exception.transaction_id} className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-sm text-orange-800">{exception.transaction_id}</h4>
                        <p className="text-sm text-orange-700">{exception.payer_name}</p>
                      </div>
                      <Badge variant="error">Score: {exception.match_score}%</Badge>
                    </div>
                    <p className="text-xs text-orange-600 mb-3">{exception.flagged_reason}</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="primary" className="flex-1">
                        Manual Allocate
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Return to Payer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* AI Health & System Performance */}
        <Card className="mt-8">
          <h3 className="text-xl font-bold text-primary mb-6">AI Matching Performance</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {mockAIHealthMetrics.auto_allocated}
              </div>
              <p className="text-sm text-neutral-600">Auto Allocated</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {mockAIHealthMetrics.admin_review}
              </div>
              <p className="text-sm text-neutral-600">Admin Review</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {mockAIHealthMetrics.exceptions}
              </div>
              <p className="text-sm text-neutral-600">Exceptions</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {mockAIHealthMetrics.avg_allocation_time_ms}ms
              </div>
              <p className="text-sm text-neutral-600">Avg Response Time</p>
            </div>
          </div>
        </Card>

        {/* High Risk Payers Alert */}
        {highRiskPayers.length > 0 && (
          <Card className="mt-8 border-l-4 border-red-500 bg-red-50">
            <div className="flex items-start gap-4">
              <Icon name="alert" className="w-6 h-6 text-red-600 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-red-800 mb-2">
                  High Risk Payers Detected
                </h3>
                <p className="text-red-700 mb-4">
                  {highRiskPayers.length} payer(s) flagged for suspicious activity
                </p>
                <div className="space-y-2">
                  {highRiskPayers.map(payer => (
                    <div key={payer.payer_id} className="flex items-center justify-between bg-white p-3 rounded">
                      <div>
                        <p className="font-semibold text-sm">{payer.full_name}</p>
                        <p className="text-xs text-neutral-600">{payer.country} • Risk Score: {payer.risk_score}</p>
                      </div>
                      <Link to={`/admin/education/payers/${payer.payer_id}`}>
                        <Button size="sm" variant="outline">Review</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EducationAdminDashboard;
