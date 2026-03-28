import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';
import Icon from '../../components/shared/Icon';
import plansData from '../../data/zororo-plans.json';

const SubscriptionFlow = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [idUploadType, setIdUploadType] = useState('manual'); // 'manual', 'idcard', 'passport'
  const [formData, setFormData] = useState({
    // Step 1: Personal Details
    fullName: '',
    phone: '',
    email: '',
    countryOfResidence: '',
    
    // Step 2: Beneficiary Details - Flexible ID Upload
    policyholderIdPassport: '', // manual entry
    policyholderIdUpload: null, // legacy single file
    policyholderIdFrontUpload: null, // ID card front
    policyholderIdBackUpload: null, // ID card back
    policyholderPassportFrontUpload: null, // passport front
    spouseFullName: '',
    spouseIdPassport: '',
    spouseDateOfBirth: '',
    children: [],
    beneficiaryName: '',
    beneficiaryRelationship: '',
    beneficiaryPhone: '',

    // Optional add-ons
    addAccidental: false,
    
    // Step 3: Terms acceptance
    acceptTerms: false,
    acceptWaitingPeriod: false
  });

  const [planDetails, setPlanDetails] = useState(null);

  useEffect(() => {
    // Load plan details from canonical data file
    try {
      const raw = plansData;
      const found = raw.plans.find(p => p.id === planId) || raw.plans.find(p => p.id === 'r2000');
      if (found) {
        setPlanDetails({
          id: found.id,
          name: found.displayName,
          monthlyPremium: `Family: R${found.premiumFamily} · Single: R${found.premiumSingle}`,
          icon: found.category === 'Worldwide' ? 'airplane' : 'shield',
          coverageSummary: found.fullBenefits && found.fullBenefits[0] ? found.fullBenefits[0] : found.keyBenefits.join(', '),
          waitingPeriod: found.waitingPeriods || 'See terms'
        });
      }
    } catch (err) {
      console.error('Failed to load plan data', err);
    }
  }, [planId]);

  const steps = [
    { number: 1, title: 'Personal Details', icon: 'user' },
    { number: 2, title: 'Beneficiary Details', icon: 'users' },
    { number: 3, title: 'Review & Confirm', icon: 'check' },
    { number: 4, title: 'Payment', icon: 'creditCard' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const fieldValue = type === 'checkbox' ? checked : (type === 'file' ? files[0] : value);
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));
  };

  const addChild = () => {
    setFormData(prev => ({
      ...prev,
      children: [...prev.children, { fullName: '', dateOfBirth: '', idNumber: '' }]
    }));
  };

  const removeChild = (index) => {
    setFormData(prev => ({
      ...prev,
      children: prev.children.filter((_, i) => i !== index)
    }));
  };

  const updateChild = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      children: prev.children.map((child, i) => 
        i === index ? { ...child, [field]: value } : child
      )
    }));
  };

  const validateStep = (step) => {
    switch(step) {
      case 1:
        return formData.fullName && formData.phone && formData.email && formData.countryOfResidence;
      case 2:
        // Allow any ONE path: manual text OR ID card (both sides) OR passport (front)
        const hasManualId = formData.policyholderIdPassport && formData.policyholderIdPassport.trim() !== '';
        const hasIdCard = formData.policyholderIdFrontUpload && formData.policyholderIdBackUpload;
        const hasPassport = formData.policyholderPassportFrontUpload;
        const hasValidIdUpload = hasManualId || hasIdCard || hasPassport;
        return hasValidIdUpload && formData.beneficiaryName && formData.beneficiaryRelationship;
      case 3:
        return formData.acceptTerms && formData.acceptWaitingPeriod;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 4) {
        // Navigate to payment page
        navigate('/insurance/payment', { state: { formData, planDetails } });
      } else {
        setCurrentStep(prev => prev + 1);
      }
    } else {
      alert('Please fill in all required fields');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  if (!planDetails) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container-custom max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Subscribe to Insurance</h1>
          <p className="text-xl text-neutral-600">Complete your subscription in 4 easy steps</p>
        </div>

        {/* Progress Stepper */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center flex-1">
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                      currentStep >= step.number 
                        ? 'bg-secondary text-white' 
                        : 'bg-neutral-200 text-neutral-500'
                    }`}
                  >
                    <Icon name={step.icon} className="w-6 h-6" />
                  </div>
                  <div className={`mt-2 text-sm font-semibold text-center ${
                    currentStep >= step.number ? 'text-secondary' : 'text-neutral-500'
                  }`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div 
                    className={`flex-1 h-1 mx-2 ${
                      currentStep > step.number ? 'bg-secondary' : 'bg-neutral-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <Card className="mb-8">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-primary mb-6">Personal Details</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                        placeholder="+263 77 123 4567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">
                      Country of Residence <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="countryOfResidence"
                      value={formData.countryOfResidence}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                    >
                      <option value="">Select Country</option>
                      <option value="South Africa">South Africa</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-primary mb-6">Beneficiary & Family Details</h2>
                <div className="space-y-6">
                  {/* Policyholder ID - Flexible Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-3">
                      Policyholder Identification <span className="text-red-500">*</span>
                    </label>
                    
                    {/* Tab Selector */}
                    <div className="flex gap-2 mb-4 border-b border-neutral-200">
                      <button
                        type="button"
                        onClick={() => setIdUploadType('manual')}
                        className={`px-4 py-2 font-semibold border-b-2 transition-all ${
                          idUploadType === 'manual'
                            ? 'border-secondary text-secondary'
                            : 'border-transparent text-neutral-600 hover:text-primary'
                        }`}
                      >
                        Manual Entry
                      </button>
                      <button
                        type="button"
                        onClick={() => setIdUploadType('idcard')}
                        className={`px-4 py-2 font-semibold border-b-2 transition-all ${
                          idUploadType === 'idcard'
                            ? 'border-secondary text-secondary'
                            : 'border-transparent text-neutral-600 hover:text-primary'
                        }`}
                      >
                        ID Card
                      </button>
                      <button
                        type="button"
                        onClick={() => setIdUploadType('passport')}
                        className={`px-4 py-2 font-semibold border-b-2 transition-all ${
                          idUploadType === 'passport'
                            ? 'border-secondary text-secondary'
                            : 'border-transparent text-neutral-600 hover:text-primary'
                        }`}
                      >
                        Passport
                      </button>
                    </div>

                    {/* Manual Entry */}
                    {idUploadType === 'manual' && (
                      <div className="space-y-2">
                        <input
                          type="text"
                          name="policyholderIdPassport"
                          value={formData.policyholderIdPassport}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                          placeholder="Enter your ID or Passport number"
                        />
                        <p className="text-xs text-neutral-600">Enter your ID number or passport number for verification</p>
                      </div>
                    )}

                    {/* ID Card Upload */}
                    {idUploadType === 'idcard' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-primary mb-2">Front of ID Card</label>
                          <input
                            type="file"
                            name="policyholderIdFrontUpload"
                            accept="image/*,application/pdf"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg"
                          />
                          {formData.policyholderIdFrontUpload && (
                            <p className="text-xs text-green-600 mt-1">✓ {formData.policyholderIdFrontUpload.name}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-primary mb-2">Back of ID Card</label>
                          <input
                            type="file"
                            name="policyholderIdBackUpload"
                            accept="image/*,application/pdf"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg"
                          />
                          {formData.policyholderIdBackUpload && (
                            <p className="text-xs text-green-600 mt-1">✓ {formData.policyholderIdBackUpload.name}</p>
                          )}
                        </div>
                        <p className="text-xs text-neutral-600">Upload clear photos of both sides of your ID card</p>
                      </div>
                    )}

                    {/* Passport Upload */}
                    {idUploadType === 'passport' && (
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-primary mb-2">Passport Front Page</label>
                        <input
                          type="file"
                          name="policyholderPassportFrontUpload"
                          accept="image/*,application/pdf"
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-neutral-300 rounded-lg"
                        />
                        {formData.policyholderPassportFrontUpload && (
                          <p className="text-xs text-green-600 mt-1">✓ {formData.policyholderPassportFrontUpload.name}</p>
                        )}
                        <p className="text-xs text-neutral-600 mt-2">Upload a clear photo of your passport front page</p>
                      </div>
                    )}
                  </div>

                  {/* Spouse Details */}
                  <div className="bg-primary-50 p-6 rounded-lg">
                    <h3 className="font-bold text-primary mb-4">Spouse Details (Optional)</h3>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-primary mb-2">
                            Spouse Full Name
                          </label>
                          <input
                            type="text"
                            name="spouseFullName"
                            value={formData.spouseFullName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                            placeholder="Jane Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-primary mb-2">
                            Spouse ID / Passport
                          </label>
                          <input
                            type="text"
                            name="spouseIdPassport"
                            value={formData.spouseIdPassport}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                            placeholder="ID or Passport"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-primary mb-2">
                          Spouse Date of Birth
                        </label>
                        <input
                          type="date"
                          name="spouseDateOfBirth"
                          value={formData.spouseDateOfBirth}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="bg-secondary-50 p-6 rounded-lg">
                    <h3 className="font-bold text-primary mb-4">Children / Dependants (Optional)</h3>
                    {formData.children.map((child, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg mb-4">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-semibold">Child {index + 1}</h4>
                          <button
                            onClick={() => removeChild(index)}
                            className="text-red-500 hover:text-red-700 text-sm font-semibold"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                          <input
                            type="text"
                            value={child.fullName}
                            onChange={(e) => updateChild(index, 'fullName', e.target.value)}
                            placeholder="Full Name"
                            className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                          />
                          <input
                            type="date"
                            value={child.dateOfBirth}
                            onChange={(e) => updateChild(index, 'dateOfBirth', e.target.value)}
                            placeholder="Date of Birth"
                            className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                          />
                          <input
                            type="text"
                            value={child.idNumber}
                            onChange={(e) => updateChild(index, 'idNumber', e.target.value)}
                            placeholder="ID Number"
                            className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                          />
                        </div>
                      </div>
                    ))}
                    <Button onClick={addChild} variant="outline" size="sm">
                      + Add Child
                    </Button>
                  </div>

                  {/* Primary Beneficiary */}
                  <div className="bg-neutral-50 p-6 rounded-lg">
                    <h3 className="font-bold text-primary mb-4">Primary Beneficiary <span className="text-red-500">*</span></h3>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-primary mb-2">
                            Beneficiary Full Name
                          </label>
                          <input
                            type="text"
                            name="beneficiaryName"
                            value={formData.beneficiaryName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                            placeholder="Beneficiary Name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-primary mb-2">
                            Relationship
                          </label>
                          <select
                            name="beneficiaryRelationship"
                            value={formData.beneficiaryRelationship}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                          >
                            <option value="">Select Relationship</option>
                            <option value="Spouse">Spouse</option>
                            <option value="Child">Child</option>
                            <option value="Parent">Parent</option>
                            <option value="Sibling">Sibling</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-primary mb-2">
                          Beneficiary Contact Number
                        </label>
                        <input
                          type="tel"
                          name="beneficiaryPhone"
                          value={formData.beneficiaryPhone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                          placeholder="+263 77 123 4567"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-primary mb-6">Review & Confirm</h2>
                
                {/* Selected Plan Summary */}
                <div className="bg-secondary-50 p-6 rounded-lg mb-6">
                  <div className="flex items-center mb-4">
                    <div className="text-5xl mr-4">{planDetails.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-primary">{planDetails.name}</h3>
                      <p className="text-neutral-600">{planDetails.coverageSummary}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 border-t pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-primary">Monthly Premium:</span>
                      <span className="text-3xl font-bold text-secondary">{planDetails.monthlyPremium}</span>
                    </div>
                    {formData.addAccidental && (
                      <div className="flex justify-between items-center text-sm text-neutral-600">
                        <span>+ Accidental Add‑on</span>
                        <span className="font-semibold">R{plansData.addOns.accidental.price}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Personal Details Summary */}
                <div className="bg-white border border-neutral-200 p-6 rounded-lg mb-6">
                  <h3 className="font-bold text-primary mb-4">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-neutral-600">Name:</span>
                      <p className="font-semibold">{formData.fullName}</p>
                    </div>
                    <div>
                      <span className="text-neutral-600">Email:</span>
                      <p className="font-semibold">{formData.email}</p>
                    </div>
                    <div>
                      <span className="text-neutral-600">Phone:</span>
                      <p className="font-semibold">{formData.phone}</p>
                    </div>
                    <div>
                      <span className="text-neutral-600">Country:</span>
                      <p className="font-semibold">{formData.countryOfResidence}</p>
                    </div>
                  </div>
                </div>

                {/* Waiting Period Notice */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-6">
                  <div className="flex">
                    <svg className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <h4 className="font-bold text-yellow-800 mb-2">Waiting Period</h4>
                      <p className="text-sm text-yellow-700">{planDetails.waitingPeriod}</p>
                    </div>
                  </div>
                </div>

                {/* Add‑ons */}
                <Card className="mb-6 bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-primary">Add Accidental Death Cover</h4>
                      <p className="text-sm text-neutral-600">Optional accidental death protection as an add‑on (+R15/month).</p>
                    </div>
                    <div>
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="addAccidental"
                          checked={formData.addAccidental}
                          onChange={handleChange}
                          className="w-5 h-5 text-secondary focus:ring-secondary rounded"
                        />
                        <span className="text-sm font-semibold">Add (+R15/month)</span>
                      </label>
                    </div>
                  </div>
                </Card>

                {/* Terms & Conditions */}
                <div className="space-y-4">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      className="w-5 h-5 text-secondary focus:ring-secondary rounded mt-1"
                    />
                    <span className="ml-3 text-neutral-700">
                      I accept the <a href="#" className="text-secondary font-semibold hover:underline">Terms and Conditions</a> and confirm that all information provided is accurate.
                    </span>
                  </label>

                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      name="acceptWaitingPeriod"
                      checked={formData.acceptWaitingPeriod}
                      onChange={handleChange}
                      className="w-5 h-5 text-secondary focus:ring-secondary rounded mt-1"
                    />
                    <span className="ml-3 text-neutral-700">
                      I understand and accept the waiting period requirements for this policy.
                    </span>
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            onClick={prevStep}
            variant="outline"
            disabled={currentStep === 1}
          >
            ← Previous
          </Button>
          
          <Button
            onClick={nextStep}
            variant="primary"
          >
            {currentStep === 3 ? 'Proceed to Payment' : 'Next Step'} →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionFlow;
