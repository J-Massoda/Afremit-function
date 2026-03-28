import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';
import Icon from '../../components/shared/Icon';
import plansData from '../../data/zororo-plans.json';

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { policyReference, planDetails, formData, paymentMethod, paymentStatus } = location.state || {};

  // Store subscriber data to localStorage on mount
  React.useEffect(() => {
    if (policyReference && formData) {
      const subscriberData = {
        policyReference,
        planDetails,
        personalDetails: {
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          countryOfResidence: formData.countryOfResidence
        },
        source: new URLSearchParams(window.location.search).get('utm_source') || 'website',
        status: 'active',
        createdAt: new Date().toISOString(),
        monthlyPremium: planDetails.monthlyPremium,
        addOns: formData.addAccidental ? ['accidental'] : []
      };
      localStorage.setItem(`zororo_subscription_${policyReference}`, JSON.stringify(subscriberData));
      
      // Also store in active subscriptions list for reporting
      const activeSubscriptions = JSON.parse(localStorage.getItem('zororo_active_subscriptions') || '[]');
      activeSubscriptions.push(policyReference);
      localStorage.setItem('zororo_active_subscriptions', JSON.stringify(activeSubscriptions));
    }
  }, [policyReference, formData, planDetails]);

  if (!policyReference || !planDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <p className="text-center text-neutral-600">Invalid confirmation. Please contact support.</p>
          <Button to="/insurance/zororo-phumulani" variant="primary" className="mt-4">
            Back to Plans
          </Button>
        </Card>
      </div>
    );
  }

  const handleDownloadPolicy = () => {
    // Mock download - in production this would generate a PDF
    alert('Policy summary download will be implemented. Check your email for policy documents.');
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container-custom max-w-4xl">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="text-center mb-8"
        >
          <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-20 h-20 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-primary mb-4">Subscription Successful!</h1>
          <p className="text-xl text-neutral-600">
            Your insurance policy is now active
          </p>
        </motion.div>

        {/* Policy Reference Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="mb-8 bg-gradient-to-br from-secondary to-secondary-600 text-white">
            <div className="text-center">
              <p className="text-secondary-100 mb-2">Your Policy Reference Number</p>
              <h2 className="text-4xl font-mono font-bold mb-4">{policyReference}</h2>
              <p className="text-sm text-secondary-100 mb-6">
                Please save this reference number for future correspondence
              </p>
              
              {/* WhatsApp Contact CTA */}
              <div className="flex items-center justify-center gap-3 bg-white bg-opacity-20 rounded-lg px-4 py-3 backdrop-blur">
                <Icon name="whatsapp" className="w-5 h-5" />
                <a
                  href={`https://wa.me/+263771234567?text=Reference: ${policyReference}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:opacity-80 transition-opacity font-semibold text-sm"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Policy Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Policy Details</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Plan Information */}
              <div className="bg-primary-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <span className="text-5xl mr-4">{planDetails.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-primary">{planDetails.name}</h3>
                    <p className="text-sm text-neutral-600">{planDetails.coverageSummary}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 border-t border-primary-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Monthly Premium</span>
                    <span className="text-2xl font-bold text-secondary">{planDetails.monthlyPremium}</span>
                  </div>
                  {formData?.addAccidental && (
                    <div className="flex justify-between items-center text-sm text-neutral-600">
                      <span>Accidental Add‑on</span>
                      <span className="font-semibold">R{plansData.addOns.accidental.price}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Subscriber Information */}
              <div className="bg-neutral-50 p-6 rounded-lg">
                <h4 className="font-bold text-primary mb-4">Policyholder</h4>
                <div className="space-y-2 text-sm">
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
            </div>

            {/* Payment Confirmation */}
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-bold text-green-800 mb-2">Payment Confirmed</h4>
                  <p className="text-sm text-green-700 mb-2">
                    Your payment via {paymentMethod === 'ecocash' ? 'EcoCash' : 'Card'} has been successfully processed.
                  </p>
                  <p className="text-sm text-green-700">
                    A confirmation email has been sent to <strong>{formData.email}</strong>
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* What Happens Next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-6">What Happens Next?</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="font-bold text-secondary">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Email Confirmation</h4>
                  <p className="text-neutral-600">You'll receive a detailed policy document via email within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="font-bold text-secondary">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Welcome Call</h4>
                  <p className="text-neutral-600">Our team will contact you within 48 hours to welcome you and answer any questions</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="font-bold text-secondary">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Coverage Begins</h4>
                  <p className="text-neutral-600">Your policy coverage starts immediately for accidental death. Natural death coverage begins after the waiting period.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="font-bold text-secondary">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Access Your Dashboard</h4>
                  <p className="text-neutral-600">View your policy, update beneficiaries, and manage payments online anytime</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Important Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="mb-8 bg-yellow-50 border-l-4 border-yellow-400">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h4 className="font-bold text-yellow-800 mb-2">Important Reminders</h4>
                <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                  <li>Keep your policy reference number safe</li>
                  <li>Ensure your monthly premiums are paid on time to maintain coverage</li>
                  <li>Update your beneficiary information if there are any changes</li>
                  <li>Contact us immediately in case of a claim</li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={handleDownloadPolicy}
            variant="primary"
            size="lg"
            className="flex items-center gap-2"
          >
            <Icon name="download" className="w-5 h-5" /> Download Policy Summary
          </Button>
          
          <Button
            to="/"
            variant="outline"
            size="lg"
          >
            Go to Dashboard
          </Button>
          
          <Button
            to="/insurance/zororo-phumulani"
            variant="ghost"
            size="lg"
          >
            View Other Plans
          </Button>
        </motion.div>

        {/* Support Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Card className="bg-primary-50">
            <h3 className="font-bold text-primary mb-4">Need Help?</h3>
            <p className="text-neutral-600 mb-4">
              Our customer support team is here to assist you 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 text-secondary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-semibold">+263 77 123 4567</span>
              </div>
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 text-secondary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-semibold">support@zororophumulani.co.za</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
