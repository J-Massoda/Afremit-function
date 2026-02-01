import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Icon from './Icon';

const RequestQuoteModal = ({ isOpen, onClose, provider }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: '',
    budgetRange: '',
    duration: '',
    location: '',
    description: '',
    needsSurveyor: false,
    images: []
  });

  const projectTypes = {
    construction: [
      'New Residential Build',
      'Home Renovation',
      'Commercial Building',
      'Extension/Addition',
      'Roofing',
      'Other'
    ],
    medical: [
      'General Consultation',
      'Specialist Treatment',
      'Diagnostic Tests',
      'Surgical Procedure',
      'Other'
    ],
    education: [
      'Primary School Enrollment',
      'Secondary School Enrollment',
      'University/College',
      'Professional Course',
      'Other'
    ]
  };

  const budgetRanges = [
    'Under R50,000',
    'R50,000 - R100,000',
    'R100,000 - R250,000',
    'R250,000 - R500,000',
    'R500,000 - R1,000,000',
    'Over R1,000,000'
  ];

  const durations = [
    'Less than 1 month',
    '1-3 months',
    '3-6 months',
    '6-12 months',
    'Over 1 year'
  ];

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    // Mock submission
    console.log('Quote request submitted:', formData);
    setStep(4); // Success step
  };

  const isStepValid = () => {
    if (step === 1) {
      return formData.projectType && formData.budgetRange;
    }
    if (step === 2) {
      return formData.duration && formData.location;
    }
    if (step === 3) {
      return formData.description.length > 20;
    }
    return true;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-primary">Request a Quote</h2>
              <p className="text-sm text-neutral-600">{provider.businessName}</p>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              <Icon name="close" className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Indicator */}
          {step < 4 && (
            <div className="px-6 py-4 border-b border-neutral-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-600">Step {step} of 3</span>
                <span className="text-sm text-neutral-500">{Math.round((step / 3) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="px-6 py-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Project Type *
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => handleChange('projectType', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select project type...</option>
                      {projectTypes[provider.serviceCategory]?.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Budget Range *
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => handleChange('budgetRange', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select budget range...</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Expected Duration *
                    </label>
                    <select
                      value={formData.duration}
                      onChange={(e) => handleChange('duration', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select duration...</option>
                      {durations.map((duration) => (
                        <option key={duration} value={duration}>
                          {duration}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Project Location *
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      placeholder="Enter city or address..."
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  {provider.serviceCategory === 'construction' && (
                    <label className="flex items-center gap-3 p-4 border border-neutral-300 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.needsSurveyor}
                        onChange={(e) => handleChange('needsSurveyor', e.target.checked)}
                        className="w-5 h-5 text-primary rounded focus:ring-primary"
                      />
                      <div>
                        <p className="font-medium text-neutral-700">Request Land Surveyor</p>
                        <p className="text-sm text-neutral-500">Include professional land survey in quote</p>
                      </div>
                    </label>
                  )}
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Project Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      placeholder="Describe your project in detail. Include specific requirements, preferences, and any other relevant information..."
                      rows={6}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                    <p className="text-sm text-neutral-500 mt-1">
                      {formData.description.length}/500 characters (minimum 20)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Upload Reference Images or Documents (Optional)
                    </label>
                    <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                      <Icon name="camera" className="w-12 h-12 text-neutral-400 mx-auto mb-2" />
                      <input
                        type="file"
                        multiple
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <span className="text-primary hover:text-primary-700 font-medium">Click to upload</span>
                        <span className="text-neutral-600"> or drag and drop</span>
                      </label>
                      <p className="text-sm text-neutral-500 mt-1">PNG, JPG, PDF up to 10MB</p>
                      {formData.images.length > 0 && (
                        <div className="mt-4 text-left">
                          <p className="text-sm font-medium text-neutral-700 mb-2">
                            {formData.images.length} file(s) selected:
                          </p>
                          <ul className="text-sm text-neutral-600 space-y-1">
                            {formData.images.map((file, idx) => (
                              <li key={idx} className="truncate">• {file.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="check" className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-2">Quote Request Sent!</h3>
                  <p className="text-neutral-600 mb-6">
                    {provider.businessName} will review your request and respond with a detailed quote including milestones.
                  </p>
                  <div className="bg-secondary-50 rounded-lg p-4 mb-6 text-left">
                    <h4 className="font-semibold text-secondary-900 mb-2">What happens next?</h4>
                    <ul className="space-y-2 text-sm text-neutral-700">
                      <li className="flex items-start gap-2">
                        <Icon name="check" className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span>Provider reviews your project requirements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="check" className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span>You'll receive a detailed quote with milestones (typically within 48 hours)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="check" className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span>Review, negotiate, and approve the quote to start the contract</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="check" className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span>Funds held securely in escrow until milestones are completed</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="secondary"
                      size="lg"
                      onClick={() => navigate('/client/dashboard')}
                      className="flex-1"
                    >
                      Go to Dashboard
                    </Button>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={onClose}
                      className="flex-1"
                    >
                      Close
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Actions */}
          {step < 4 && (
            <div className="sticky bottom-0 bg-neutral-50 border-t border-neutral-200 px-6 py-4 flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={step === 1 ? onClose : handleBack}
              >
                {step === 1 ? 'Cancel' : 'Back'}
              </Button>
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={!isStepValid()}
              >
                {step === 3 ? 'Submit Request' : 'Continue'}
              </Button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RequestQuoteModal;
