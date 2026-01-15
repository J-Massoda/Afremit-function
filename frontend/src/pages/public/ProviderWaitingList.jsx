import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';

const ProviderWaitingList = () => {
  const [formData, setFormData] = useState({
    fullNames: '',
    organizationName: '',
    serviceType: '',
    country: '',
    city: '',
    websiteOrSocial: '',
    email: '',
    phone: '',
    internationalPayments: '',
    securePayments: '',
    referralSource: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement actual form submission to backend
    console.log('Provider form submitted:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-primary mb-4">Thank You for Your Interest!</h2>
            <p className="text-xl text-neutral-600 mb-8">
              We've received your application to join Afremit as a service provider. 
              Our team will review your information and contact you soon.
            </p>
            <Button to="/" variant="primary">Return to Homepage</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="container-custom max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {/* Logo */}
          <div className="mb-8">
            <div className="text-5xl font-bold text-primary">Afremit</div>
          </div>

          <h1 className="text-4xl font-bold text-primary mb-4">
            Service Provider Interest Form
          </h1>
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
            Welcome! This form is for <strong>education, healthcare and home construction entities</strong> who wish 
            to register as verified service providers on the platform in order to receive diaspora-backed 
            payments for education, medical care, construction and other vital services.
          </p>
          <p className="text-md text-neutral-600 mt-4">
            Please complete the form below to join our waiting list in preparation for launch.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Names */}
              <div>
                <label htmlFor="fullNames" className="block text-sm font-semibold text-primary mb-2">
                  Full Names <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullNames"
                  name="fullNames"
                  required
                  value={formData.fullNames}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>

              {/* Organization Name */}
              <div>
                <label htmlFor="organizationName" className="block text-sm font-semibold text-primary mb-2">
                  Organization Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="organizationName"
                  name="organizationName"
                  required
                  value={formData.organizationName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Your school, hospital, or company name"
                />
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Service Type <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'school', label: 'School / Educational Institution' },
                    { value: 'hospital', label: 'Hospital / Medical Centre' },
                    { value: 'construction', label: 'Construction company' },
                    { value: 'other', label: 'Other' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="serviceType"
                        value={option.value}
                        required
                        checked={formData.serviceType === option.value}
                        onChange={handleChange}
                        className="w-4 h-4 text-secondary focus:ring-secondary"
                      />
                      <span className="ml-3 text-neutral-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Country */}
              <div>
                <label htmlFor="country" className="block text-sm font-semibold text-primary mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Your country"
                />
              </div>

              {/* City/Town */}
              <div>
                <label htmlFor="city" className="block text-sm font-semibold text-primary mb-2">
                  City/Town <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Your city or town"
                />
              </div>

              {/* Website or Social Page */}
              <div>
                <label htmlFor="websiteOrSocial" className="block text-sm font-semibold text-primary mb-2">
                  Website or Social Page <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  id="websiteOrSocial"
                  name="websiteOrSocial"
                  required
                  value={formData.websiteOrSocial}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="https://"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Phone/WhatsApp */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-primary mb-2">
                  Phone/WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="+263 77 123 4567"
                />
              </div>

              {/* International Payments */}
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Would you like to receive international payments? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="internationalPayments"
                        value={option}
                        required
                        checked={formData.internationalPayments === option}
                        onChange={handleChange}
                        className="w-4 h-4 text-secondary focus:ring-secondary"
                      />
                      <span className="ml-3 text-neutral-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Secure Service-Based Payments */}
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Interested in secure service based payments? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="securePayments"
                        value={option}
                        required
                        checked={formData.securePayments === option}
                        onChange={handleChange}
                        className="w-4 h-4 text-secondary focus:ring-secondary"
                      />
                      <span className="ml-3 text-neutral-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Referral Source */}
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  How did you hear about Afremit? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'friend', label: 'Friend/family' },
                    { value: 'linkedin', label: 'LinkedIn' },
                    { value: 'other', label: 'Other' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="referralSource"
                        value={option.value}
                        required
                        checked={formData.referralSource === option.value}
                        onChange={handleChange}
                        className="w-4 h-4 text-secondary focus:ring-secondary"
                      />
                      <span className="ml-3 text-neutral-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button type="submit" variant="primary" size="lg" className="w-full">
                  Submit Application
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProviderWaitingList;
