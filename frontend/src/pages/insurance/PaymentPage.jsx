import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';import Icon from '../../components/shared/Icon';
const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { formData, planDetails } = location.state || {};
  
  const [paymentMethod, setPaymentMethod] = useState('');
  const [processing, setProcessing] = useState(false);
  
  // EcoCash payment details
  const [ecocashNumber, setEcocashNumber] = useState('');
  
  // Card payment details
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  // Generate policy reference
  const policyReference = `ZP-${Date.now().toString().slice(-8)}`;

  if (!formData || !planDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <p className="text-center text-neutral-600">Invalid payment session. Please start subscription again.</p>
          <Button to="/insurance/zororo-phumulani" variant="primary" className="mt-4">
            Back to Plans
          </Button>
        </Card>
      </div>
    );
  }

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    if (paymentMethod === 'ecocash' && !ecocashNumber) {
      alert('Please enter your EcoCash number');
      return;
    }

    if (paymentMethod === 'card') {
      if (!cardDetails.cardNumber || !cardDetails.cardName || !cardDetails.expiryDate || !cardDetails.cvv) {
        alert('Please fill in all card details');
        return;
      }
    }

    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      
      // Mock success - navigate to confirmation
      navigate('/insurance/confirmation', {
        state: {
          policyReference,
          planDetails,
          formData,
          paymentMethod,
          paymentStatus: 'SUCCESS'
        }
      });
    }, 2000);
  };

  const extractMonthlyAmount = (priceString) => {
    // Extract number from "Starting from $25" or "$45"
    const match = priceString.match(/\$(\d+)/);
    return match ? match[1] : '0';
  };

  const monthlyAmount = extractMonthlyAmount(planDetails.monthlyPremium);

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Complete Your Payment</h1>
          <p className="text-xl text-neutral-600">Secure payment for your insurance subscription</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="md:col-span-2">
            <Card>
              <h2 className="text-2xl font-bold text-primary mb-6">Payment Method</h2>

              {/* Payment Method Selection */}
              <div className="space-y-4 mb-8">
                {/* EcoCash Option */}
                <label 
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === 'ecocash' 
                      ? 'border-secondary bg-secondary-50' 
                      : 'border-neutral-200 hover:border-secondary-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="ecocash"
                    checked={paymentMethod === 'ecocash'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-secondary focus:ring-secondary"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex items-center">
                      <Icon name="phone" className="w-8 h-8 mr-3 text-primary" />
                      <div>
                        <p className="font-bold text-primary">EcoCash</p>
                        <p className="text-sm text-neutral-600">Pay with your EcoCash mobile wallet</p>
                      </div>
                    </div>
                  </div>
                </label>

                {/* EcoCash Details */}
                {paymentMethod === 'ecocash' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pl-12 pr-4 pb-4"
                  >
                    <label className="block text-sm font-semibold text-primary mb-2">
                      EcoCash Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={ecocashNumber}
                      onChange={(e) => setEcocashNumber(e.target.value)}
                      placeholder="077 123 4567"
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                    />
                    <p className="text-sm text-neutral-600 mt-2">
                      You will receive a prompt on your phone to authorize the payment
                    </p>
                  </motion.div>
                )}

                {/* Debit/Credit Card Option */}
                <label 
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === 'card' 
                      ? 'border-secondary bg-secondary-50' 
                      : 'border-neutral-200 hover:border-secondary-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-secondary focus:ring-secondary"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex items-center">
                      <Icon name="creditCard" className="w-8 h-8 mr-3 text-primary" />
                      <div>
                        <p className="font-bold text-primary">Debit / Credit Card</p>
                        <p className="text-sm text-neutral-600">Pay with Visa, Mastercard, or other cards</p>
                      </div>
                    </div>
                  </div>
                </label>

                {/* Card Details Form */}
                {paymentMethod === 'card' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pl-12 pr-4 pb-4 space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">
                        Card Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={cardDetails.cardNumber}
                        onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">
                        Cardholder Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={cardDetails.cardName}
                        onChange={(e) => setCardDetails({ ...cardDetails, cardName: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-primary mb-2">
                          Expiry Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={cardDetails.expiryDate}
                          onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                          placeholder="MM/YY"
                          maxLength="5"
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-primary mb-2">
                          CVV <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                          placeholder="123"
                          maxLength="4"
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Card Icons */}
                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-sm text-neutral-600">We accept:</span>
                      <div className="flex gap-2">
                        <div className="w-10 h-6 bg-neutral-100 rounded flex items-center justify-center text-xs font-bold">VISA</div>
                        <div className="w-10 h-6 bg-neutral-100 rounded flex items-center justify-center text-xs font-bold">MC</div>
                        <div className="w-10 h-6 bg-neutral-100 rounded flex items-center justify-center text-xs font-bold">AMEX</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Security Notice */}
              <div className="bg-primary-50 border-l-4 border-primary p-4 rounded-lg mb-6">
                <div className="flex">
                  <svg className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-primary mb-1">Secure Payment</p>
                    <p className="text-xs text-neutral-600">Your payment information is encrypted and secure. We never store your full card details.</p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handlePayment}
                variant="primary"
                size="lg"
                disabled={processing}
                className="w-full"
              >
                {processing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Payment...
                  </span>
                ) : (
                  `Pay $${monthlyAmount} Now`
                )}
              </Button>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <h3 className="text-xl font-bold text-primary mb-6">Order Summary</h3>

              {/* Plan Details */}
              <div className="mb-6 pb-6 border-b">
                <div className="flex items-center mb-3">
                  <span className="text-4xl mr-3">{planDetails.icon}</span>
                  <div>
                    <p className="font-bold text-primary">{planDetails.name}</p>
                    <p className="text-xs text-neutral-600">Monthly Subscription</p>
                  </div>
                </div>
              </div>

              {/* Subscriber Info */}
              <div className="mb-6 pb-6 border-b">
                <p className="text-sm font-semibold text-neutral-600 mb-2">Subscriber</p>
                <p className="font-semibold text-primary">{formData.fullName}</p>
                <p className="text-sm text-neutral-600">{formData.email}</p>
              </div>

              {/* Policy Reference */}
              <div className="mb-6 pb-6 border-b">
                <p className="text-sm font-semibold text-neutral-600 mb-2">Policy Reference</p>
                <p className="font-mono font-bold text-primary">{policyReference}</p>
              </div>

              {/* Amount Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Monthly Premium</span>
                  <span className="font-semibold">${monthlyAmount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Processing Fee</span>
                  <span className="font-semibold">$0</span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span>First Month Discount</span>
                  <span className="font-semibold">-$0</span>
                </div>
              </div>

              {/* Total */}
              <div className="bg-secondary-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-primary">Total Due Today</span>
                  <span className="text-3xl font-bold text-secondary">${monthlyAmount}</span>
                </div>
                <p className="text-xs text-neutral-600 mt-2">
                  Then ${monthlyAmount}/month starting next billing cycle
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
          >
            ← Back to Review
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
