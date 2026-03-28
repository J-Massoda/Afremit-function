import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Card from '../../../components/shared/Card';
import Button from '../../../components/shared/Button';
import Icon from '../../../components/shared/Icon';
import plansData from '../../../data/zororo-plans.json';

const InsuranceReports = () => {
  const [filterSource, setFilterSource] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Get subscriber analytics from mock data
  const subscribers = useMemo(() => {
    return plansData.subscriberAnalytics || [];
  }, []);

  // Filter logic
  const filteredSubscribers = useMemo(() => {
    return subscribers.filter(sub => {
      const matchesSource = filterSource === 'all' || sub.source === filterSource;
      const matchesStatus = filterStatus === 'all' || sub.status === filterStatus;
      const matchesSearch = searchTerm === '' || 
        sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.phone.includes(searchTerm) ||
        sub.policyReference.includes(searchTerm);
      return matchesSource && matchesStatus && matchesSearch;
    });
  }, [subscribers, filterSource, filterStatus, searchTerm]);

  // Calculate summary statistics
  const stats = useMemo(() => {
    const totalSubscribers = subscribers.length;
    const activeCount = subscribers.filter(s => s.status === 'active').length;
    const totalRevenue = subscribers.reduce((sum, s) => sum + (s.monthlyPremium || 0), 0);
    
    // Source breakdown
    const sourceBreakdown = {
      website: subscribers.filter(s => s.source === 'website').length,
      whatsapp: subscribers.filter(s => s.source === 'whatsapp').length,
      franchise: subscribers.filter(s => s.source.startsWith('franchise')).length
    };

    const sourcePercentages = {
      website: totalSubscribers > 0 ? ((sourceBreakdown.website / totalSubscribers) * 100).toFixed(1) : 0,
      whatsapp: totalSubscribers > 0 ? ((sourceBreakdown.whatsapp / totalSubscribers) * 100).toFixed(1) : 0,
      franchise: totalSubscribers > 0 ? ((sourceBreakdown.franchise / totalSubscribers) * 100).toFixed(1) : 0
    };

    return {
      totalSubscribers,
      activeCount,
      totalRevenue,
      conversionRate: totalSubscribers > 0 ? ((activeCount / totalSubscribers) * 100).toFixed(1) : 0,
      sourceBreakdown,
      sourcePercentages
    };
  }, [subscribers]);

  const handleExportCSV = () => {
    const headers = ['Policy Reference', 'Name', 'Email', 'Phone', 'Plan', 'Source', 'Status', 'Monthly Premium', 'Created At'];
    const rows = filteredSubscribers.map(sub => [
      sub.policyReference,
      sub.name,
      sub.email,
      sub.phone,
      sub.plan,
      sub.source,
      sub.status,
      `R${sub.monthlyPremium}`,
      new Date(sub.createdAt).toLocaleDateString()
    ]);

    let csvContent = 'data:text/csv;charset=utf-8,' + headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.map(cell => `"${cell}"`).join(',') + '\n';
    });

    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `insurance-report-${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
  };

  const getSourceColor = (source) => {
    switch (source) {
      case 'website':
        return 'bg-blue-100 text-blue-800';
      case 'whatsapp':
        return 'bg-green-100 text-green-800';
      default:
        return source.startsWith('franchise') ? 'bg-purple-100 text-purple-800' : 'bg-neutral-100 text-neutral-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-6 md:py-8">
      <div className="container-custom max-w-7xl px-4 md:px-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 md:mb-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Insurance Analytics</h1>
              <p className="text-sm md:text-base text-neutral-600">Zororo Phumulani subscription reports and metrics</p>
            </div>
            <Button onClick={handleExportCSV} variant="primary" className="flex items-center gap-2 w-full md:w-auto justify-center">
              <Icon name="download" className="w-5 h-5" />
              Export CSV
            </Button>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8"
        >
          {/* Total Subscribers Card */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500">
            <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 sm:gap-0">
              <div>
                <p className="text-blue-600 text-xs md:text-sm font-semibold mb-1">Total Subscribers</p>
                <p className="text-3xl md:text-4xl font-bold text-blue-900">{stats.totalSubscribers}</p>
                <p className="text-xs text-blue-700 mt-2">All-time registrations</p>
              </div>
              <div className="p-3 sm:p-4 bg-blue-200 rounded-full flex-shrink-0">
                <Icon name="users" className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600" />
              </div>
            </div>
          </Card>

          {/* Active Subscribers Card */}
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-500">
            <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 sm:gap-0">
              <div>
                <p className="text-green-600 text-xs md:text-sm font-semibold mb-1">Active Policies</p>
                <p className="text-3xl md:text-4xl font-bold text-green-900">{stats.activeCount}</p>
                <p className="text-xs text-green-700 mt-2">{stats.conversionRate}% of total</p>
              </div>
              <div className="p-3 sm:p-4 bg-green-200 rounded-full flex-shrink-0">
                <Icon name="check" className="w-6 sm:w-8 h-6 sm:h-8 text-green-600" />
              </div>
            </div>
          </Card>

          {/* Total Revenue Card */}
          <Card className="bg-gradient-to-br from-secondary-50 to-secondary-100 border-l-4 border-secondary">
            <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 sm:gap-0">
              <div>
                <p className="text-secondary-600 text-xs md:text-sm font-semibold mb-1">Total Revenue</p>
                <p className="text-3xl md:text-4xl font-bold text-secondary-900">R{stats.totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-secondary-700 mt-2">Monthly premiums</p>
              </div>
              <div className="p-3 sm:p-4 bg-secondary-200 rounded-full flex-shrink-0">
                <Icon name="money" className="w-6 sm:w-8 h-6 sm:h-8 text-secondary-600" />
              </div>
            </div>
          </Card>

          {/* Conversion Rate Card */}
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-purple-500">
            <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 sm:gap-0">
              <div>
                <p className="text-purple-600 text-xs md:text-sm font-semibold mb-1">Conversion Rate</p>
                <p className="text-3xl md:text-4xl font-bold text-purple-900">{stats.conversionRate}%</p>
                <p className="text-xs text-purple-700 mt-2">Active to total ratio</p>
              </div>
              <div className="p-3 sm:p-4 bg-purple-200 rounded-full flex-shrink-0">
                <Icon name="chart" className="w-6 sm:w-8 h-6 sm:h-8 text-purple-600" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Source Breakdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8"
        >
          {/* Website Source */}
          <Card>
            <div className="text-center">
              <div className="w-20 md:w-24 h-20 md:h-24 mx-auto mb-3 md:mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xl md:text-2xl font-bold text-blue-600">{stats.sourcePercentages.website}%</p>
                  <Icon name="home" className="w-6 md:w-8 h-6 md:h-8 text-blue-500 mx-auto mt-1" />
                </div>
              </div>
              <h3 className="font-bold text-primary mb-2 text-sm md:text-base">Website</h3>
              <p className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">{stats.sourceBreakdown.website}</p>
              <p className="text-xs md:text-sm text-neutral-600">Direct site registrations</p>
            </div>
          </Card>

          {/* WhatsApp Source */}
          <Card>
            <div className="text-center">
              <div className="w-20 md:w-24 h-20 md:h-24 mx-auto mb-3 md:mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xl md:text-2xl font-bold text-green-600">{stats.sourcePercentages.whatsapp}%</p>
                  <Icon name="whatsapp" className="w-6 md:w-8 h-6 md:h-8 text-green-500 mx-auto mt-1" />
                </div>
              </div>
              <h3 className="font-bold text-primary mb-2 text-sm md:text-base">WhatsApp</h3>
              <p className="text-2xl md:text-3xl font-bold text-green-600 mb-1">{stats.sourceBreakdown.whatsapp}</p>
              <p className="text-xs md:text-sm text-neutral-600">Via WhatsApp bot</p>
            </div>
          </Card>

          {/* Franchise Source */}
          <Card>
            <div className="text-center">
              <div className="w-20 md:w-24 h-20 md:h-24 mx-auto mb-3 md:mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xl md:text-2xl font-bold text-purple-600">{stats.sourcePercentages.franchise}%</p>
                  <Icon name="briefcase" className="w-6 md:w-8 h-6 md:h-8 text-purple-500 mx-auto mt-1" />
                </div>
              </div>
              <h3 className="font-bold text-primary mb-2 text-sm md:text-base">Franchise</h3>
              <p className="text-2xl md:text-3xl font-bold text-purple-600 mb-1">{stats.sourceBreakdown.franchise}</p>
              <p className="text-xs md:text-sm text-neutral-600">Franchise partnerships</p>
            </div>
          </Card>
        </motion.div>

        {/* Filters and Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            {/* Filter Section */}
            <div className="mb-6 pb-6 border-b border-neutral-200">
              <h3 className="font-bold text-primary mb-4 text-sm md:text-base">Filters</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block text-xs md:text-sm font-semibold text-primary mb-2">Search</label>
                  <input
                    type="text"
                    placeholder="Name, email, phone, reference..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 md:px-4 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-primary mb-2">Source</label>
                  <select
                    value={filterSource}
                    onChange={(e) => setFilterSource(e.target.value)}
                    className="w-full px-3 md:px-4 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  >
                    <option value="all">All Sources</option>
                    <option value="website">Website</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="franchise">Franchise</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-primary mb-2">Status</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-3 md:px-4 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="flex items-end sm:col-span-2 lg:col-span-1">
                  <Button
                    onClick={() => {
                      setFilterSource('all');
                      setFilterStatus('all');
                      setSearchTerm('');
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
              <p className="text-sm text-neutral-600 mt-4">
                Showing {filteredSubscribers.length} of {subscribers.length} subscribers
              </p>
            </div>

            {/* Subscribers Table - Desktop View */}
            <div className="hidden md:block overflow-x-auto">
              {filteredSubscribers.length > 0 ? (
                <table className="w-full text-sm">
                  <thead className="bg-neutral-50 border-b-2 border-neutral-200">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-primary">Reference</th>
                      <th className="px-4 py-3 text-left font-semibold text-primary">Name</th>
                      <th className="px-4 py-3 text-left font-semibold text-primary">Email</th>
                      <th className="px-4 py-3 text-left font-semibold text-primary">Plan</th>
                      <th className="px-4 py-3 text-left font-semibold text-primary">Source</th>
                      <th className="px-4 py-3 text-left font-semibold text-primary">Premium</th>
                      <th className="px-4 py-3 text-left font-semibold text-primary">Status</th>
                      <th className="px-4 py-3 text-left font-semibold text-primary">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {filteredSubscribers.map((sub, index) => (
                      <tr key={index} className="hover:bg-neutral-50 transition-colors">
                        <td className="px-4 py-3 font-mono font-semibold text-secondary text-xs md:text-sm">{sub.policyReference}</td>
                        <td className="px-4 py-3 font-semibold text-primary text-xs md:text-sm">{sub.name}</td>
                        <td className="px-4 py-3 text-neutral-600 text-xs md:text-sm">{sub.email}</td>
                        <td className="px-4 py-3 text-xs md:text-sm">{sub.plan}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getSourceColor(sub.source)}`}>
                            {sub.source.startsWith('franchise') ? `${sub.source.split(':')[0]}` : sub.source}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-semibold text-secondary text-xs md:text-sm">R{sub.monthlyPremium}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(sub.status)}`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-neutral-600 text-xs md:text-sm">{new Date(sub.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-12">
                  <Icon name="document" className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                  <p className="text-neutral-600 font-semibold">No subscribers found matching your filters</p>
                </div>
              )}
            </div>

            {/* Subscribers Cards - Mobile View */}
            <div className="md:hidden space-y-4">
              {filteredSubscribers.length > 0 ? (
                filteredSubscribers.map((sub, index) => (
                  <div key={index} className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs text-neutral-600 font-semibold">Reference</p>
                          <p className="font-mono font-bold text-secondary text-sm">{sub.policyReference}</p>
                        </div>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(sub.status)}`}>
                          {sub.status}
                        </span>
                      </div>
                      <div className="border-t pt-3">
                        <p className="text-xs text-neutral-600 font-semibold mb-1">Policyholder</p>
                        <p className="font-semibold text-primary text-sm">{sub.name}</p>
                        <p className="text-xs text-neutral-600 truncate">{sub.email}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-neutral-600 font-semibold mb-1">Plan</p>
                          <p className="font-semibold text-primary text-sm">{sub.plan}</p>
                        </div>
                        <div>
                          <p className="text-xs text-neutral-600 font-semibold mb-1">Premium</p>
                          <p className="font-semibold text-secondary text-sm">R{sub.monthlyPremium}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-neutral-600 font-semibold mb-1">Source</p>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getSourceColor(sub.source)}`}>
                            {sub.source.startsWith('franchise') ? `${sub.source.split(':')[0]}` : sub.source}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-neutral-600 font-semibold mb-1">Registered</p>
                          <p className="text-xs font-semibold text-primary">{new Date(sub.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Icon name="document" className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                  <p className="text-neutral-600 font-semibold">No subscribers found matching your filters</p>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default InsuranceReports;
