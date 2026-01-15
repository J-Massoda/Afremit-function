import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';

const ClientWaitingList = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    currentCountry: '',
    supportedCountry: '',
    services: [],
    moneyMisused: '',
    concerns: [],
    helpNeeded: '',
    directServices: [],
    privateUpdates: '',
    joinWaitingList: '',
    ambassador: '',
    referralSource: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked 
          ? [...prev[name], value]
          : prev[name].filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement actual form submission to backend
    console.log('Client form submitted:', formData);
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
            <h2 className="text-3xl font-bold text-primary mb-4">Welcome to the Afremit Family!</h2>
            <p className="text-xl text-neutral-600 mb-8">
              Thank you for joining our waiting list. We'll keep you updated on our launch 
              and notify you as soon as Afremit is available in your country.
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

          <h1 className="text-4xl font-bold text-primary mb-6">
            Diaspora Waiting List
          </h1>
          
          <div className="bg-secondary-50 border-l-4 border-secondary rounded-lg p-6 text-left mb-8">
            <p className="text-lg text-neutral-700 mb-4">
              <strong>Tired of sending money home for school fees, construction, or hospital bills only for it to be misused?</strong>
            </p>
            <p className="text-neutral-700">
              You will be able to send purpose driven funds to Africa directly to verified institutions/contractors/builders 
              in your home country on our platform upon confirmation of milestone/service delivered e.g for construction 
              foundation completed [Payment only made to service provider upon verification that work is done according 
              to agreed terms with the buyer]
            </p>
          </div>

          <p className="text-sm text-neutral-600">
            Website <a href="http://www.afremit.com" className="text-secondary font-semibold hover:underline">www.afremit.com</a> - Currently under maintenance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-primary mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Your full name"
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

              {/* WhatsApp Number */}
              <div>
                <label htmlFor="whatsapp" className="block text-sm font-semibold text-primary mb-2">
                  WhatsApp number (with country code) <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  required
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="+44 7700 900000"
                />
              </div>

              {/* Current Country */}
              <div>
                <label htmlFor="currentCountry" className="block text-sm font-semibold text-primary mb-2">
                  Country You Currently Live In <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="currentCountry"
                  name="currentCountry"
                  required
                  value={formData.currentCountry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="United Kingdom, USA, Canada, etc."
                />
              </div>

              {/* Supported African Country */}
              <div>
                <label htmlFor="supportedCountry" className="block text-sm font-semibold text-primary mb-2">
                  Which African country do you support financially? <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="supportedCountry"
                  name="supportedCountry"
                  required
                  value={formData.supportedCountry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Nigeria, Ghana, Kenya, Zimbabwe, etc."
                />
              </div>

              {/* Services Sending Funds For */}
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Which services do you mostly send funds for? (multiple selection) <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'education', label: 'Paying educational/school fees back home' },
                    { value: 'healthcare', label: 'Supporting healthcare/medical bills' },
                    { value: 'construction', label: 'Construction or building projects' },
                    { value: 'groceries', label: 'Family groceries/ general purpose' },
                    { value: 'other', label: 'Other' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="services"
                        value={option.value}
                        checked={formData.services.includes(option.value)}
                        onChange={handleChange}
                        className="w-4 h-4 text-secondary focus:ring-secondary rounded"
                      />
                      <span className="ml-3 text-neutral-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Money Misused */}
              <div>
                <label htmlFor="moneyMisused" className="block text-sm font-semibold text-primary mb-2">
                  Have you ever had money misused back home? <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="moneyMisused"
                  name="moneyMisused"
                  required
                  value={formData.moneyMisused}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Share your experience..."
                />
              </div>

              {/* Concerns */}
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  What concerns do you have when sending money home? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'trust', label: 'Trust issues (money not used as intended)' },
                    { value: 'fees', label: 'High transfer fees' },
                    { value: 'delivery', label: 'Slow delivery time' },
                    { value: 'tracking', label: 'No clear tracking/updates' },
                    { value: 'providers', label: 'No local provider service options' },
                    { value: 'other', label: 'Other' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="concerns"
                        value={option.value}
                        checked={formData.concerns.includes(option.value)}
                        onChange={handleChange}
                        className="w-4 h-4 text-secondary focus:ring-secondary rounded"
                      />
                      <span className="ml-3 text-neutral-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* How Can We Help */}
              <div>
                <label htmlFor="helpNeeded" className="block text-sm font-semibold text-primary mb-2">
                  How can we help you?
                </label>
                <textarea
                  id="helpNeeded"
                  name="helpNeeded"
                  value={formData.helpNeeded}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Tell us about your specific needs..."
                />
              </div>

              {/* Direct Services */}
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  What type of services would you like to pay directly for? (Escrow protected & normal remittances)
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'schools', label: 'Verified Schools' },
                    { value: 'hospitals', label: 'Hospitals /clinics' },
                    { value: 'contractors', label: 'Contractors / builders' },
                    { value: 'businesses', label: 'Businesses / Product suppliers' },
                    { value: 'groceries', label: 'Family groceries/ General purposes' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="directServices"
                        value={option.value}
                        checked={formData.directServices.includes(option.value)}
                        onChange={handleChange}
                        className="w-4 h-4 text-secondary focus:ring-secondary rounded"
                      />
                      <span className="ml-3 text-neutral-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Private Updates */}
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Would you like to receive private updates about launch in your country? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {['Yes', 'No', 'Not sure'].map((option) => (
                    <label key={option} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="privateUpdates"
                        value={option}
                        required
                        checked={formData.privateUpdates === option}
                        onChange={handleChange}
                        className="w-4 h-4 text-secondary focus:ring-secondary"
                      />
                      <span className="ml-3 text-neutral-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Join Waiting List */}
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Would you like to be added to our Afremit waiting list? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="joinWaitingList"
                        value={option}
                        required
                        checked={formData.joinWaitingList === option}
                        onChange={handleChange}
                        className="w-4 h-4 text-secondary focus:ring-secondary"
                      />
                      <span className="ml-3 text-neutral-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Ambassador */}
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Would you be interested in becoming an Afremit diaspora ambassador where you live? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {['Yes', 'No', 'Need more information on this'].map((option) => (
                    <label key={option} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="ambassador"
                        value={option}
                        required
                        checked={formData.ambassador === option}
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
                  How did you hear about us? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'whatsapp', label: 'WhatsApp group' },
                    { value: 'social', label: 'Social media (Facebook, Instagram, Twitter)' },
                    { value: 'friend', label: 'Friend/family' },
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
                  Join Waiting List
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ClientWaitingList;
