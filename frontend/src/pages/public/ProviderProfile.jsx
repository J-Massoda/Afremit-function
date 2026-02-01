import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { providersAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';
import VerificationBadge from '../../components/shared/VerificationBadge';
import Icon from '../../components/shared/Icon';
import RequestQuoteModal from '../../components/shared/RequestQuoteModal';
import ChatBox from '../../components/shared/ChatBox';

const ProviderProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showBlueprintDisclaimer, setShowBlueprintDisclaimer] = useState(false);

  const isVerified = user?.state === 'VERIFIED' || user?.state === 'PUBLISHED';
  
  // Determine service type
  const isConstructionService = provider?.serviceCategory?.toLowerCase() === 'construction';
  const isEducationService = provider?.serviceCategory?.toLowerCase() === 'education';
  const isHealthcareService = provider?.serviceCategory?.toLowerCase() === 'healthcare' || 
                              provider?.serviceCategory?.toLowerCase() === 'medical';
  
  // Construction requires quote/escrow, Education/Healthcare use chat
  const requiresQuoteFlow = isConstructionService;

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
                    {requiresQuoteFlow ? (
                      <>
                        <Button 
                          variant="primary" 
                          size="lg" 
                          className="w-full md:w-auto"
                          onClick={() => setShowBlueprintDisclaimer(true)}
                        >
                          Request a Quote
                        </Button>
                        <Button
                          variant="secondary"
                          size="lg"
                          className="w-full md:w-auto"
                          onClick={() => setShowChat(true)}
                        >
                          <Icon name="chat" className="w-5 h-5" />
                          Start Chat
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="primary"
                          size="lg"
                          className="w-full md:w-auto"
                          onClick={() => setShowChat(true)}
                        >
                          <Icon name="chat" className="w-5 h-5" />
                          Contact Provider
                        </Button>
                      </>
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
                      {!isAuthenticated ? 'Login to Contact Provider' : 'Complete KYC to Contact Provider'}
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
                          Complete verification to contact providers
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

              {/* Education-specific content */}
              {isEducationService && provider.educationDetails && (
                <>
                  <Card>
                    <h3 className="text-xl font-bold text-primary mb-4">Courses & Programs</h3>
                    <div className="space-y-4">
                      {provider.educationDetails.courses?.map((course, index) => (
                        <div key={index} className="border-b border-neutral-200 pb-4 last:border-0">
                          <h4 className="font-semibold text-neutral-800">{course.name}</h4>
                          <p className="text-sm text-neutral-600 mt-1">{course.description}</p>
                          {course.duration && (
                            <p className="text-sm text-secondary mt-2">Duration: {course.duration}</p>
                          )}
                          {course.fee && (
                            <p className="text-sm font-bold text-primary mt-1">Fee: ${course.fee}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>

                  {provider.educationDetails.paymentStructure && (
                    <Card>
                      <h3 className="text-xl font-bold text-primary mb-4">Payment Structure</h3>
                      <div className="space-y-2">
                        {provider.educationDetails.paymentStructure.map((option, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b border-neutral-100">
                            <span className="text-neutral-700">{option.type}</span>
                            <span className="font-semibold text-primary">{option.details}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                </>
              )}

              {/* Healthcare-specific content */}
              {isHealthcareService && provider.healthcareDetails && (
                <>
                  <Card>
                    <h3 className="text-xl font-bold text-primary mb-4">Medical Services</h3>
                    <div className="space-y-3">
                      {provider.healthcareDetails.specializations?.map((spec, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Icon name="medical" className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-semibold text-neutral-800">{spec.name}</h4>
                            {spec.description && (
                              <p className="text-sm text-neutral-600">{spec.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {provider.healthcareDetails.consultationFees && (
                    <Card>
                      <h3 className="text-xl font-bold text-primary mb-4">Consultation Fees</h3>
                      <div className="space-y-2">
                        {provider.healthcareDetails.consultationFees.map((fee, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b border-neutral-100">
                            <span className="text-neutral-700">{fee.type}</span>
                            <span className="font-semibold text-primary">${fee.amount}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {provider.healthcareDetails.operatingHours && (
                    <Card>
                      <h3 className="text-xl font-bold text-primary mb-4">Operating Hours</h3>
                      <div className="space-y-2 text-sm">
                        {Object.entries(provider.healthcareDetails.operatingHours).map(([day, hours]) => (
                          <div key={day} className="flex justify-between">
                            <span className="text-neutral-700 capitalize">{day}</span>
                            <span className="font-semibold text-neutral-800">{hours}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                </>
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

        {/* Blueprint Disclaimer Modal for Construction */}
        {showBlueprintDisclaimer && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            onClick={() => setShowBlueprintDisclaimer(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Icon name="warning" className="w-8 h-8 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-primary mb-2">Blueprint Required</h3>
                  <p className="text-neutral-700">
                    Before engaging with construction service providers, please ensure you have:
                  </p>
                </div>
              </div>

              <div className="bg-neutral-50 rounded-lg p-4 mb-6 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-secondary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    1
                  </div>
                  <p className="text-neutral-700">
                    <strong>Detailed Blueprints or Architectural Plans</strong> - Professional drawings showing dimensions, specifications, and design requirements
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-secondary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    2
                  </div>
                  <p className="text-neutral-700">
                    <strong>Project Scope Document</strong> - Clear description of work to be done, materials required, and timeline expectations
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-secondary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    3
                  </div>
                  <p className="text-neutral-700">
                    <strong>Budget Estimate</strong> - Realistic budget range for your project
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Having detailed plans helps providers give accurate quotes and ensures project success. Incomplete information may result in delays and cost overruns.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowBlueprintDisclaimer(false)}
                >
                  I'll Prepare Plans
                </Button>
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={() => {
                    setShowBlueprintDisclaimer(false);
                    setShowQuoteModal(true);
                  }}
                >
                  I Have Plans, Continue
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Request Quote Modal - Only for Construction */}
        {showQuoteModal && requiresQuoteFlow && (
          <RequestQuoteModal
            isOpen={showQuoteModal}
            onClose={() => setShowQuoteModal(false)}
            provider={provider}
          />
        )}

        {/* Chat Box - For all communications */}
        <ChatBox
          provider={provider}
          isOpen={showChat}
          onClose={() => setShowChat(false)}
        />
      </div>
    </div>
  );
};

export default ProviderProfile;
