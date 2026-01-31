import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';
import Icon from '../../components/shared/Icon';

const InsurancePlans = () => {
  const navigate = useNavigate();

  const plans = [
    {
      id: 'funeral-repatriation',
      name: 'Funeral & Repatriation Plan',
      tagline: 'Complete funeral cover with repatriation',
      startingPrice: 'Starting from $25',
      popular: true,
      icon: 'shield',
      color: 'primary',
      keyBenefits: [
        'Funeral arrangements and costs covered',
        'Repatriation from South Africa',
        'Spouse + up to 6 children covered',
        'Chema & Nhaka allowance',
        'Hearse and casket provided',
        'Documentation support'
      ],
      fullBenefits: [
        'Complete funeral arrangements',
        'Repatriation from South Africa to home country',
        'Coverage for policyholder, spouse, and up to 6 children',
        'Hearse and transportation',
        'Casket or cremation costs',
        'Chema (wake) allowance',
        'Nhaka (inheritance ceremony) support',
        'Death certificate and documentation assistance',
        'Grief counseling services',
        'Memorial service coordination'
      ],
      coverageLimits: {
        mainMember: 'Up to $10,000',
        spouse: 'Up to $8,000',
        children: 'Up to $5,000 each'
      },
      waitingPeriod: '6 months for natural death, immediate for accidental death',
      whoCovered: 'Policyholder (18-65), Spouse, Children (0-21 or up to 25 if in school)'
    },
    {
      id: 'worldwide-funeral',
      name: 'Worldwide Funeral Plan',
      tagline: 'Global coverage with international repatriation',
      startingPrice: 'Starting from $45',
      popular: false,
      icon: 'airplane',
      color: 'secondary',
      keyBenefits: [
        'Worldwide repatriation included',
        'International funeral coverage',
        'Family coverage included',
        'Emergency assistance 24/7',
        'Multiple country support',
        'Premium funeral services'
      ],
      fullBenefits: [
        'Worldwide repatriation to any country',
        'International funeral service coordination',
        'Coverage for policyholder, spouse, and dependants',
        '24/7 emergency assistance hotline',
        'Premium hearse and transportation',
        'High-quality casket or cremation',
        'International documentation support',
        'Multi-country legal assistance',
        'Cultural ceremony accommodations',
        'Translation services if needed',
        'Embassy coordination support'
      ],
      coverageLimits: {
        mainMember: 'Up to $15,000',
        spouse: 'Up to $12,000',
        children: 'Up to $8,000 each'
      },
      waitingPeriod: '3 months for natural death, immediate for accidental death',
      whoCovered: 'Policyholder (18-70), Spouse, Children (0-21 or up to 25 if in school), Parents (optional add-on)'
    },
    {
      id: 'accidental-death',
      name: 'Accidental Death Cover',
      tagline: 'Immediate protection for accidents',
      startingPrice: 'From $15',
      popular: false,
      icon: 'medical',
      color: 'accent',
      keyBenefits: [
        'Accidental death coverage only',
        'Immediate cover - no waiting period',
        'Low monthly premium',
        'Lump sum payout',
        'Simple benefits',
        'Fast claim processing'
      ],
      fullBenefits: [
        'Lump sum payment for accidental death',
        'No waiting period - immediate coverage',
        'Coverage for fatal accidents only',
        'Simple claim process',
        'Fast payout within 48 hours of claim approval',
        'Covers policyholder only',
        'Death certificate assistance',
        'Basic funeral cost contribution',
        'Family notification support'
      ],
      coverageLimits: {
        mainMember: 'Up to $20,000 lump sum',
        spouse: 'Not covered (can purchase separate policy)',
        children: 'Not covered (can purchase separate policy)'
      },
      waitingPeriod: 'No waiting period - immediate coverage',
      whoCovered: 'Policyholder only (18-65 years old)'
    }
  ];

  const handleSubscribe = (planId) => {
    navigate(`/insurance/subscribe/${planId}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-secondary text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200')] bg-cover bg-center" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-semibold mb-6">
              Zororo Phumulani Insurance
            </div>
            <h1 className="mb-6">Protect Your Family's Future</h1>
            <p className="text-xl md:text-2xl text-secondary-100 mb-8">
              Comprehensive funeral cover, repatriation services, and accidental death protection. 
              Designed for diaspora families with affordable monthly premiums.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-semibold">Authorised FSP</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-semibold">Licensed Insurer</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-sm font-semibold">24/7 Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-primary mb-4">Choose Your Protection Plan</h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Select the insurance plan that best fits your family's needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-secondary text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <Card className={`h-full ${plan.popular ? 'ring-2 ring-secondary shadow-2xl' : ''}`}>
                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <div className="mb-4 flex justify-center">
                      <Icon name={plan.icon} className="w-16 h-16 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-2">{plan.name}</h3>
                    <p className="text-neutral-600 mb-4">{plan.tagline}</p>
                    <div className="text-3xl font-bold text-secondary mb-2">{plan.startingPrice}</div>
                    <p className="text-sm text-neutral-500">per month</p>
                  </div>

                  {/* Key Benefits */}
                  <ul className="space-y-3 mb-8">
                    {plan.keyBenefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <svg className="w-5 h-5 text-secondary mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-neutral-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button 
                    onClick={() => handleSubscribe(plan.id)}
                    variant={plan.popular ? 'primary' : 'outline'}
                    className="w-full"
                  >
                    Subscribe Now
                  </Button>

                  {/* View Details Link */}
                  <button
                    onClick={() => {
                      document.getElementById(`plan-details-${plan.id}`).scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full mt-3 text-sm text-secondary hover:text-secondary-700 font-semibold"
                  >
                    View Full Details →
                  </button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Plan Details Sections */}
      {plans.map((plan, index) => (
        <section 
          key={plan.id} 
          id={`plan-details-${plan.id}`}
          className={`section ${index % 2 === 0 ? 'bg-neutral-50' : 'bg-white'}`}
        >
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="max-w-4xl mx-auto">
                {/* Plan Header */}
                <div className="text-center mb-12">
                  <div className="mb-4 flex justify-center">
                    <Icon name={plan.icon} className="w-16 h-16 text-primary" />
                  </div>
                  <h2 className="text-primary mb-4">{plan.name}</h2>
                  <p className="text-xl text-neutral-600">{plan.tagline}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Full Benefits */}
                  <Card className="bg-white">
                    <h3 className="text-xl font-bold text-primary mb-4">Complete Benefits</h3>
                    <ul className="space-y-3">
                      {plan.fullBenefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="w-5 h-5 text-secondary mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-neutral-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>

                  {/* Coverage & Details */}
                  <div className="space-y-6">
                    {/* Coverage Limits */}
                    <Card className="bg-white">
                      <h3 className="text-xl font-bold text-primary mb-4">Coverage Limits</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span className="font-semibold text-neutral-700">Main Member</span>
                          <span className="text-secondary font-bold">{plan.coverageLimits.mainMember}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span className="font-semibold text-neutral-700">Spouse</span>
                          <span className="text-secondary font-bold">{plan.coverageLimits.spouse}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-neutral-700">Children</span>
                          <span className="text-secondary font-bold">{plan.coverageLimits.children}</span>
                        </div>
                      </div>
                    </Card>

                    {/* Waiting Period */}
                    <Card className="bg-primary-50 border-l-4 border-primary">
                      <h4 className="font-bold text-primary mb-2">Waiting Period</h4>
                      <p className="text-neutral-700">{plan.waitingPeriod}</p>
                    </Card>

                    {/* Who is Covered */}
                    <Card className="bg-white">
                      <h4 className="font-bold text-primary mb-2">Who is Covered</h4>
                      <p className="text-neutral-700">{plan.whoCovered}</p>
                    </Card>
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                  <Button 
                    onClick={() => handleSubscribe(plan.id)}
                    variant="primary"
                    size="lg"
                  >
                    Continue to Subscription
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* Why Choose Section */}
      <section className="section bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="mb-6">Why Choose Zororo Phumulani?</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div>
                <div className="mb-4 flex justify-center">
                  <Icon name="lightning" className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Instant Coverage</h3>
                <p className="text-secondary-100">Subscribe online and get immediate protection</p>
              </div>
              <div>
                <div className="mb-4 flex justify-center">
                  <Icon name="money" className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Affordable Premiums</h3>
                <p className="text-secondary-100">Plans starting from just $15 per month</p>
              </div>
              <div>
                <div className="mb-4 flex justify-center">
                  <Icon name="location" className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Diaspora Friendly</h3>
                <p className="text-secondary-100">Designed for families living abroad</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default InsurancePlans;
