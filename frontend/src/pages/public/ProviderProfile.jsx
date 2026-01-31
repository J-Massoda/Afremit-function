import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { providersAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';
import VerificationBadge from '../../components/shared/VerificationBadge';
import Icon from '../../components/shared/Icon';

const ProviderProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isVerified = user?.state === 'VERIFIED' || user?.state === 'PUBLISHED';

  useEffect(() => {
    fetchProviderProfile();
  }, [id]);

  const fetchProviderProfile = async () => {
    try {
      setLoading(true);
      const response = await providersAPI.getById(id);
      setProvider(response.data.provider);
    } catch (error) {
      console.error('Failed to fetch provider profile:', error);
      setError(error.response?.data?.message || 'Failed to load provider profile');
    } finally {
      setLoading(false);
    }
  };

  const getRatingStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-neutral-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !provider) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="container-custom">
          <Card className="text-center py-12">
            <p className="text-red-600 mb-4">{error || 'Provider not found'}</p>
            <Button onClick={() => navigate('/providers')} variant="secondary">
              Back to Directory
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back Button */}
          <button
            onClick={() => navigate('/providers')}
            className="flex items-center text-primary hover:text-primary-700 mb-6"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Directory
          </button>

          {/* Provider Header */}
          <Card className="mb-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-primary">{provider.businessName}</h1>
                  {provider.verifiedBadge && (
                    <VerificationBadge type="provider" size="lg" />
                  )}
                </div>
                
                <p className="text-lg text-neutral-600 capitalize mb-4">{provider.serviceCategory}</p>

                {provider.rating && (
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex">{getRatingStars(provider.rating)}</div>
                    <span className="text-lg font-semibold text-neutral-700">
                      {provider.rating.toFixed(1)}
                    </span>
                    <span className="text-neutral-500">
                      ({provider.completedContracts || 0} completed projects)
                    </span>
                  </div>
                )}

                {provider.stats && (
                  <div className="flex flex-wrap gap-6 mb-4">
                    <div>
                      <p className="text-sm text-neutral-500">Total Projects</p>
                      <p className="text-xl font-bold text-primary">{provider.stats.totalProjects}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">Average Project Value</p>
                      <p className="text-xl font-bold text-primary">
                        ${provider.stats.averageProjectValue?.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">On-Time Completion</p>
                      <p className="text-xl font-bold text-primary">
                        {provider.stats.onTimeCompletion}/{provider.stats.totalProjects}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {isAuthenticated && isVerified ? (
                  <>
                    <Button variant="primary" size="lg" className="w-full md:w-auto">
                      Request a Quote
                    </Button>
                    {provider.canContact && provider.phoneNumber && (
                      <div className="text-sm text-neutral-600">
                        <p className="font-semibold">Contact:</p>
                        <p className="flex items-center gap-2"><Icon name="phone" className="w-4 h-4" /> {provider.phoneNumber}</p>
                        <p className="flex items-center gap-2"><Icon name="mail" className="w-4 h-4" /> {provider.email}</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div>
                    <Button
                      variant="outline"
                      size="lg"
                      disabled
                      className="w-full md:w-auto cursor-not-allowed opacity-60 flex items-center justify-center gap-2"
                    >
                      <Icon name="lock" className="w-5 h-5" />
                      {!isAuthenticated ? 'Login to Request Quote' : 'Complete KYC to Request Quote'}
                    </Button>
                    {!isAuthenticated ? (
                      <Link to="/signup">
                        <p className="text-sm text-center text-secondary hover:underline mt-2">
                          Sign up to connect with providers
                        </p>
                      </Link>
                    ) : (
                      <Link to={user?.role === 'provider' ? '/provider/kyc' : '/client/kyc'}>
                        <p className="text-sm text-center text-secondary hover:underline mt-2">
                          Complete verification to request quotes
                        </p>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Provider Details */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* About Section */}
            <div className="md:col-span-2 space-y-6">
              {provider.bio && (
                <Card>
                  <h3 className="text-xl font-bold text-primary mb-4">About</h3>
                  <p className="text-neutral-700 whitespace-pre-line">{provider.bio}</p>
                </Card>
              )}

              {provider.services && provider.services.length > 0 && (
                <Card>
                  <h3 className="text-xl font-bold text-primary mb-4">Services Offered</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {provider.services.map((service, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-neutral-700">{service}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {provider.operatingLocations && provider.operatingLocations.length > 0 && (
                <Card>
                  <h3 className="text-xl font-bold text-primary mb-4">Operating Locations</h3>
                  <div className="space-y-2">
                    {provider.operatingLocations.map((location, index) => (
                      <div key={index} className="flex items-center gap-2 text-neutral-700">
                        <svg className="w-5 h-5 text-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {location}
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {provider.businessRegistration && (
                <Card>
                  <h3 className="text-xl font-bold text-primary mb-4">Business Information</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-neutral-500">Registration Number</p>
                      <p className="font-semibold text-neutral-700">{provider.businessRegistration}</p>
                    </div>
                    {provider.taxNumber && (
                      <div>
                        <p className="text-neutral-500">Tax Number</p>
                        <p className="font-semibold text-neutral-700">{provider.taxNumber}</p>
                      </div>
                    )}
                    <div className="pt-2 border-t border-neutral-200">
                      <div className="flex items-center gap-2 text-green-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-semibold">KYC Verified</span>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProviderProfile;
