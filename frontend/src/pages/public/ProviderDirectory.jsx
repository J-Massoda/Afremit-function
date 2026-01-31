import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { providersAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import VerificationBadge from '../../components/shared/VerificationBadge';
import Button from '../../components/shared/Button';
import Icon from '../../components/shared/Icon';

const ProviderDirectory = () => {
  const { isAuthenticated, user } = useAuth();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    serviceType: '',
    location: '',
    search: '',
    verifiedOnly: 'true',
    rating: '',
  });

  const isVerified = user?.state === 'VERIFIED' || user?.state === 'PUBLISHED';

  useEffect(() => {
    fetchProviders();
  }, [filters]);

  const fetchProviders = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.serviceType) params.serviceType = filters.serviceType;
      if (filters.location) params.location = filters.location;
      if (filters.search) params.search = filters.search;
      if (filters.verifiedOnly) params.verifiedOnly = filters.verifiedOnly;
      if (filters.rating) params.rating = filters.rating;

      const response = await providersAPI.search(params);
      setProviders(response.data.providers);
    } catch (error) {
      console.error('Failed to fetch providers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const getRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`h-5 w-5 ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Service Provider Directory</h1>
          <p className="text-gray-600">Find verified service providers for your construction, medical, and education needs</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Filter Providers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <input
              type="text"
              placeholder="Search providers..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <select
              value={filters.serviceType}
              onChange={(e) => handleFilterChange('serviceType', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Services</option>
              <option value="construction">Construction</option>
              <option value="medical">Medical</option>
              <option value="education">Education</option>
            </select>

            <input
              type="text"
              placeholder="Location..."
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <select
              value={filters.rating}
              onChange={(e) => handleFilterChange('rating', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Ratings</option>
              <option value="4">4+ Stars</option>
              <option value="4.5">4.5+ Stars</option>
            </select>

            <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={filters.verifiedOnly === 'true'}
                onChange={(e) => handleFilterChange('verifiedOnly', e.target.checked ? 'true' : 'false')}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Verified Only</span>
            </label>
          </div>
        </div>

        {/* Providers Grid */}
        {loading ? (
          <div className="text-center py-12">
            <svg className="animate-spin h-12 w-12 mx-auto text-blue-600" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        ) : providers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-500 mb-4">No providers found matching your criteria</p>
            <button
              onClick={() => setFilters({ serviceType: '', location: '', search: '', verifiedOnly: 'true', rating: '' })}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-gray-900">{provider.businessName}</h3>
                        {provider.verifiedBadge && (
                          <VerificationBadge type="provider" size="md" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 capitalize">{provider.serviceCategory}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    {getRatingStars(Math.round(provider.rating))}
                    <span className="text-sm text-gray-600 ml-2">
                      {provider.rating.toFixed(1)} ({provider.completedContracts} projects)
                    </span>
                  </div>

                  {provider.bio && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{provider.bio}</p>
                  )}

                  {provider.operatingLocations && provider.operatingLocations.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-1">Operating in:</p>
                      <div className="flex flex-wrap gap-2">
                        {provider.operatingLocations.slice(0, 3).map((location, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {location}
                          </span>
                        ))}
                        {provider.operatingLocations.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{provider.operatingLocations.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {provider.services && provider.services.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-1">Services:</p>
                      <div className="flex flex-wrap gap-2">
                        {provider.services.slice(0, 2).map((service, index) => (
                          <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                            {service}
                          </span>
                        ))}
                        {provider.services.length > 2 && (
                          <span className="text-xs text-gray-500">
                            +{provider.services.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {isAuthenticated && isVerified ? (
                    <Link to={`/providers/${provider.id}`}>
                      <Button variant="primary" size="sm" className="w-full">
                        View Profile
                      </Button>
                    </Link>
                  ) : (
                    <div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full cursor-not-allowed opacity-60 flex items-center justify-center gap-2"
                        disabled
                      >
                        <Icon name="lock" className="w-4 h-4" />
                        {!isAuthenticated ? 'Login to View Profile' : 'Complete KYC to View'}
                      </Button>
                      {!isAuthenticated && (
                        <Link to="/signup">
                          <p className="text-xs text-center text-secondary hover:underline mt-2">
                            Sign up to connect with providers
                          </p>
                        </Link>
                      )}
                      {isAuthenticated && !isVerified && (
                        <Link to={user?.role === 'provider' ? '/provider/kyc' : '/client/kyc'}>
                          <p className="text-xs text-center text-secondary hover:underline mt-2">
                            Complete verification to view full profiles
                          </p>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderDirectory;
