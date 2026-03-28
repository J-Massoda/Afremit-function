import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';
import Icon from '../../components/shared/Icon';
import plansData from '../../data/zororo-plans.json';

const InsuranceLookup = () => {
  const [searchType, setSearchType] = useState('reference'); // 'reference' or 'id'
  const [searchQuery, setSearchQuery] = useState('');
  const [foundPolicy, setFoundPolicy] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  // Combine mock data subscribers with localStorage subscriptions
  const allSubscribers = useMemo(() => {
    let subscribers = [...(plansData.subscriberAnalytics || [])];
    
    // Also check localStorage for recent subscriptions
    if (typeof window !== 'undefined') {
      const activeRefs = JSON.parse(localStorage.getItem('zororo_active_subscriptions') || '[]');
      activeRefs.forEach(ref => {
        const localData = localStorage.getItem(`zororo_subscription_${ref}`);
        if (localData) {
          try {
            const parsed = JSON.parse(localData);
            // Check if not already in mock data
            if (!subscribers.find(s => s.policyReference === ref)) {
              subscribers.push({
                policyReference: ref,
                name: parsed.personalDetails?.fullName || 'User',
                email: parsed.personalDetails?.email || '',
                phone: parsed.personalDetails?.phone || '',
                plan: parsed.planDetails?.name || 'Policy',
                monthlyPremium: parsed.monthlyPremium || 0,
                source: parsed.source || 'website',
                status: parsed.status || 'active',
                createdAt: parsed.createdAt
              });
            }
          } catch (err) {
            console.error('Error parsing localStorage subscription', err);
          }
        }
      });
    }
    
    return subscribers;
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert('Please enter a search term');
      return;
    }

    setLoading(true);
    setSearched(true);

    // Simulate search delay
    setTimeout(() => {
      let result = null;

      if (searchType === 'reference') {
        result = allSubscribers.find(s => 
          s.policyReference.toUpperCase() === searchQuery.toUpperCase().trim()
        );
      } else if (searchType === 'id') {
        // In a real app, you'd need to store ID info with each subscription
        // For now, we'll search by partial match or return mock result
        result = allSubscribers.find(s => 
          s.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFoundPolicy(result || null);
      setLoading(false);
    }, 600);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-neutral-100 text-neutral-800 border-neutral-300';
    }
  };

  const getSourceLabel = (source) => {
    if (source === 'website') return 'Website Portal';
    if (source === 'whatsapp') return 'WhatsApp Bot';
    if (source.startsWith('franchise')) return `Franchise: ${source.split(':')[1] || 'Partner'}`;
    return source;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12">
      <div className="container-custom max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-primary mb-3">Find Your Policy</h1>
          <p className="text-xl text-neutral-600 mb-2">
            Look up your Zororo Phumulani insurance policy details
          </p>
          <p className="text-sm text-neutral-500">
            Search by policy reference number or email address
          </p>
        </motion.div>

        {/* Search Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-white border-2 border-secondary-200">
            {/* Search Type Selector */}
            <div className="mb-6 pb-6 border-b border-neutral-200">
              <label className="block text-sm font-semibold text-primary mb-3">
                Search by:
              </label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="searchType"
                    value="reference"
                    checked={searchType === 'reference'}
                    onChange={(e) => {
                      setSearchType(e.target.value);
                      setFoundPolicy(null);
                      setSearchQuery('');
                    }}
                    className="w-4 h-4 text-secondary focus:ring-secondary"
                  />
                  <span className="ml-2 text-neutral-700 font-medium">
                    <Icon name="document" className="w-4 h-4 inline mr-1" />
                    Policy Reference
                  </span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="searchType"
                    value="id"
                    checked={searchType === 'id'}
                    onChange={(e) => {
                      setSearchType(e.target.value);
                      setFoundPolicy(null);
                      setSearchQuery('');
                    }}
                    className="w-4 h-4 text-secondary focus:ring-secondary"
                  />
                  <span className="ml-2 text-neutral-700 font-medium">
                    <Icon name="user" className="w-4 h-4 inline mr-1" />
                    Email Address
                  </span>
                </label>
              </div>
            </div>

            {/* Search Input */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  {searchType === 'reference' ? 'Policy Reference Number' : 'Email Address'}
                </label>
                <div className="relative flex">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      searchType === 'reference'
                        ? 'e.g., ZP-12345678'
                        : 'e.g., your.email@example.com'
                    }
                    className="flex-1 px-4 py-3 border border-neutral-300 rounded-l-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                    disabled={loading}
                  />
                  <Button
                    onClick={handleSearch}
                    disabled={loading}
                    className="rounded-l-none"
                    variant="primary"
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="inline-block mr-2"
                        >
                          ⟳
                        </motion.div>
                        Searching...
                      </>
                    ) : (
                      <>
                        <Icon name="search" className="w-5 h-5 mr-2 inline" />
                        Search
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-neutral-500 mt-2">
                  {searchType === 'reference'
                    ? 'Enter your 8-digit policy reference from your confirmation email'
                    : 'Enter the email address you used to register'}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {searched && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {foundPolicy ? (
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300">
                  {/* Success Header */}
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                      className="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Icon name="check" className="w-10 h-10 text-green-600" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-green-900 mb-1">Policy Found!</h2>
                    <p className="text-green-700">Your policy details are below</p>
                  </div>

                  {/* Policy Details Grid */}
                  <div className="bg-white rounded-lg p-6 mb-6 space-y-4">
                    {/* Reference Card */}
                    <div className="bg-gradient-to-r from-secondary to-secondary-600 text-white rounded-lg p-4 text-center">
                      <p className="text-sm text-secondary-100 mb-1">Policy Reference</p>
                      <p className="text-3xl font-mono font-bold">{foundPolicy.policyReference}</p>
                    </div>

                    {/* Two Column Details */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-neutral-50 p-4 rounded-lg">
                        <p className="text-xs text-neutral-600 font-semibold mb-1">Policyholder</p>
                        <p className="text-lg font-bold text-primary">{foundPolicy.name}</p>
                      </div>
                      <div className="bg-neutral-50 p-4 rounded-lg">
                        <p className="text-xs text-neutral-600 font-semibold mb-1">Plan</p>
                        <p className="text-lg font-bold text-primary">{foundPolicy.plan}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-neutral-50 p-4 rounded-lg">
                        <p className="text-xs text-neutral-600 font-semibold mb-1">Email</p>
                        <p className="text-sm font-semibold text-primary break-all">{foundPolicy.email}</p>
                      </div>
                      <div className="bg-neutral-50 p-4 rounded-lg">
                        <p className="text-xs text-neutral-600 font-semibold mb-1">Phone</p>
                        <p className="text-sm font-semibold text-primary">{foundPolicy.phone}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-neutral-50 p-4 rounded-lg">
                        <p className="text-xs text-neutral-600 font-semibold mb-1">Monthly Premium</p>
                        <p className="text-2xl font-bold text-secondary">R{foundPolicy.monthlyPremium}</p>
                      </div>
                      <div className="bg-neutral-50 p-4 rounded-lg">
                        <p className="text-xs text-neutral-600 font-semibold mb-1">Registration Date</p>
                        <p className="text-sm font-semibold text-primary">
                          {new Date(foundPolicy.createdAt).toLocaleDateString('en-ZA', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Status and Source */}
                    <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-neutral-200">
                      <div>
                        <p className="text-xs text-neutral-600 font-semibold mb-2">Status</p>
                        <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold border-2 ${getStatusColor(foundPolicy.status)}`}>
                          {foundPolicy.status.charAt(0).toUpperCase() + foundPolicy.status.slice(1)}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-600 font-semibold mb-2">Source</p>
                        <span className="inline-block px-4 py-2 rounded-full text-sm font-bold bg-blue-100 text-blue-800 border-2 border-blue-300">
                          {getSourceLabel(foundPolicy.source)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    {/* WhatsApp Contact */}
                    <a
                      href={`https://wa.me/+263771234567?text=I%20have%20a%20question%20about%20my%20policy%20reference:%20${foundPolicy.policyReference}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg text-center transition-colors flex items-center justify-center gap-2"
                    >
                      <Icon name="whatsapp" className="w-5 h-5" />
                      Contact Support on WhatsApp
                    </a>

                    {/* Other Actions */}
                    <div className="grid grid-cols-2 gap-3">
                      <a
                        href="tel:+263771234567"
                        className="block bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold py-3 px-4 rounded-lg text-center transition-colors"
                      >
                        <Icon name="phone" className="w-5 h-5 inline mr-2" />
                        Call Support
                      </a>
                      <a
                        href="mailto:support@zororophumulani.co.za"
                        className="block bg-purple-100 hover:bg-purple-200 text-purple-700 font-bold py-3 px-4 rounded-lg text-center transition-colors"
                      >
                        <Icon name="mail" className="w-5 h-5 inline mr-2" />
                        Email Support
                      </a>
                    </div>
                  </div>

                  {/* Info Box */}
                  <div className="mt-6 bg-white bg-opacity-70 rounded-lg p-4 border-l-4 border-blue-500">
                    <p className="text-sm text-neutral-700">
                      <span className="font-semibold text-blue-700">💡 Tip:</span> Save your policy reference number in a safe place. You'll need it for any claims or inquiries.
                    </p>
                  </div>
                </Card>
              ) : (
                <Card className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300">
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ rotate: 360, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 100 }}
                      className="w-20 h-20 bg-red-200 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Icon name="alert" className="w-10 h-10 text-red-600" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-red-900 mb-2">Policy Not Found</h2>
                    <p className="text-red-700 mb-6">
                      {searchType === 'reference'
                        ? "We couldn't find a policy with that reference number. Please check the number and try again."
                        : "We couldn't find a policy associated with that email address. Please verify your email and try again."}
                    </p>

                    <div className="bg-white bg-opacity-70 rounded-lg p-4 mb-6 text-left border-l-4 border-orange-500">
                      <p className="text-sm text-neutral-700 mb-3">
                        <span className="font-semibold text-orange-700">🔍 Tips to find your policy:</span>
                      </p>
                      <ul className="text-sm text-neutral-700 space-y-1 list-disc list-inside">
                        <li>Check your confirmation email for the policy reference (ZP-XXXXXXXX)</li>
                        <li>Ensure you're using the correct email address</li>
                        <li>Policy references are case-insensitive</li>
                        <li>Contact support if you've lost your reference number</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <Button
                        onClick={() => {
                          setSearchQuery('');
                          setFoundPolicy(null);
                          setSearched(false);
                        }}
                        variant="primary"
                        className="w-full"
                      >
                        Try Another Search
                      </Button>
                      <a
                        href="https://wa.me/+263771234567?text=I%20need%20help%20finding%20my%20policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg text-center transition-colors"
                      >
                        <Icon name="whatsapp" className="w-5 h-5 inline mr-2" />
                        Ask Support on WhatsApp
                      </a>
                    </div>
                  </div>
                </Card>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Section */}
        {!searched && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 space-y-6"
          >
            <Card className="bg-blue-50 border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-blue-900 mb-3">About This Tool</h3>
              <p className="text-blue-700 text-sm mb-3">
                This lookup tool allows you to quickly find your policy details by entering your policy reference number or the email address you used to register. Your information is displayed securely and you can immediately contact support if you have any questions.
              </p>
              <div className="space-y-2 text-sm text-blue-700">
                <p><span className="font-semibold">📋 Policy Reference:</span> Find this in your confirmation email or policy documents (format: ZP-XXXXXXXX)</p>
                <p><span className="font-semibold">✉️ Email Address:</span> Use the email address associated with your Zororo Phumulani account</p>
              </div>
            </Card>

            <Card className="bg-secondary-50 border-l-4 border-secondary">
              <h3 className="text-lg font-bold text-secondary-900 mb-3">Need Help?</h3>
              <p className="text-secondary-700 text-sm mb-4">
                Our customer support team is available 24/7 to assist you with any questions about your policy.
              </p>
              <div className="flex gap-3 flex-wrap">
                <a
                  href="https://wa.me/+263771234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-32 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg text-center transition-colors text-sm"
                >
                  <Icon name="whatsapp" className="w-4 h-4 inline mr-1" />
                  WhatsApp
                </a>
                <a
                  href="tel:+263771234567"
                  className="flex-1 min-w-32 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-center transition-colors text-sm"
                >
                  <Icon name="phone" className="w-4 h-4 inline mr-1" />
                  Phone
                </a>
                <a
                  href="mailto:support@zororophumulani.co.za"
                  className="flex-1 min-w-32 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg text-center transition-colors text-sm"
                >
                  <Icon name="mail" className="w-4 h-4 inline mr-1" />
                  Email
                </a>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InsuranceLookup;
