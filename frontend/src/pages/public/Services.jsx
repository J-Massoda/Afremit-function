import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';
import Icon from '../../components/shared/Icon';

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 'construction',
      title: 'Construction Services',
      icon: 'building',
      description: 'Connect with verified construction companies with milestone-based escrow protection',
      paymentModel: 'Milestone-Based Escrow',
      paymentDescription: 'Service provider sends quote, you approve and deposit first milestone. Funds released as work is completed and approved.',
      features: [
        'Residential building and renovations',
        'Commercial construction projects',
        'Infrastructure development',
        'Interior design and finishing',
        'Plumbing and electrical services',
        'Landscaping and outdoor works'
      ],
      howItWorks: [
        'Browse verified construction providers',
        'Submit your project requirements',
        'Receive quote with milestones from provider',
        'Approve and deposit first milestone into escrow',
        'Provider completes work phase by phase',
        'You approve and funds are released per milestone'
      ]
    },
    {
      id: 'education',
      title: 'Education Services',
      icon: 'briefcase',
      description: 'Browse schools across Sub-Saharan Africa and pay tuition fees directly',
      paymentModel: 'Direct Payment',
      paymentDescription: 'Select your school, view tuition fees and payment plans (per semester or full year), and make direct payments to the institution.',
      features: [
        'Universities and colleges',
        'Secondary and primary schools',
        'Professional certification programs',
        'Vocational training centers',
        'Language schools',
        'Online education platforms'
      ],
      howItWorks: [
        'Browse schools by country/region',
        'View tuition fees and payment plans',
        'See registration requirements',
        'Select payment schedule (semester/annual)',
        'Make direct payment to institution',
        'Receive enrollment confirmation'
      ]
    },
    {
      id: 'healthcare',
      title: 'Healthcare Services',
      icon: 'medical',
      description: 'Access medical services across Sub-Saharan Africa with direct or installment payments',
      paymentModel: 'Direct Payment / Installments',
      paymentDescription: 'Select medical service type and location, view pricing, and pay directly or through installment plans offered by the facility.',
      features: [
        'Hospital and clinic services',
        'Surgical procedures',
        'Dental care',
        'Eye care and optical services',
        'Specialist consultations',
        'Rehabilitation and therapy'
      ],
      howItWorks: [
        'Select medical service type',
        'Choose location in Sub-Saharan Africa',
        'View facility options and pricing',
        'Select payment plan (full or installment)',
        'Make direct payment to facility',
        'Book appointment and receive care'
      ]
    }
  ];

  // Filter to specific category if provided
  const displayedServices = category 
    ? services.filter(s => s.id === category)
    : services;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="mb-6">
              {category ? displayedServices[0]?.title : 'Our Service Sectors'}
            </h1>
            <p className="text-xl text-neutral-200">
              Connecting clients with KYC-verified service providers across three key sectors
            </p>
          </motion.div>
        </div>
      </section>

      {/* Payment Models Overview */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-primary mb-6">Three Payment Models</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Each service sector has its own payment structure designed for your convenience and security
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-t-4 border-secondary">
                <div className="mb-4 flex justify-start">
                  <Icon name="building" className="w-12 h-12 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Construction</h3>
                <div className="bg-secondary-50 rounded-lg p-3 mb-4">
                  <p className="text-sm font-semibold text-secondary">Milestone-Based Escrow</p>
                </div>
                <p className="text-sm text-neutral-600">
                  Provider sends quote with milestones. You deposit and approve work phase by phase. 
                  Funds held in escrow until you approve completion.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full border-t-4 border-primary">
                <div className="mb-4 flex justify-start">
                  <Icon name="briefcase" className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Education</h3>
                <div className="bg-primary-50 rounded-lg p-3 mb-4">
                  <p className="text-sm font-semibold text-primary">Direct Payment</p>
                </div>
                <p className="text-sm text-neutral-600">
                  Browse schools, view tuition fees and payment plans. 
                  Make direct payments per semester or full year to institutions.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full border-t-4 border-accent">
                <div className="mb-4 flex justify-start">
                  <Icon name="medical" className="w-12 h-12 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Healthcare</h3>
                <div className="bg-accent-50 rounded-lg p-3 mb-4">
                  <p className="text-sm font-semibold text-accent">Direct / Installments</p>
                </div>
                <p className="text-sm text-neutral-600">
                  Select medical service and location. Pay directly or through facility's 
                  installment plans. Surgery, dental, eye care, and more.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Service Sectors */}
      <section className="section bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-primary mb-6">Three Verified Service Sectors</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              All service providers undergo KYC verification before approval
            </p>
          </motion.div>

          <div className="space-y-12">
            {displayedServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 md:p-12">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-6xl">{service.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-primary">{service.title}</h2>
                        <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
                          service.id === 'construction' ? 'bg-secondary-100 text-secondary-700' :
                          service.id === 'education' ? 'bg-primary-100 text-primary-700' :
                          'bg-accent-100 text-accent-700'
                        }`}>
                          {service.paymentModel}
                        </span>
                      </div>
                      <p className="text-lg text-neutral-700">{service.description}</p>
                    </div>
                  </div>

                  <div className="bg-neutral-50 rounded-xl p-6 mb-8">
                    <h4 className="font-semibold text-primary mb-2">How Payment Works:</h4>
                    <p className="text-neutral-700">{service.paymentDescription}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="font-semibold text-primary mb-4">Available Services</h4>
                      <ul className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <svg className="w-5 h-5 text-secondary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-neutral-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-primary mb-4">How It Works</h4>
                      <ol className="space-y-3">
                        {service.howItWorks.map((step, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="flex-shrink-0 w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center text-sm mr-3 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="text-neutral-700">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Button to="/signup" variant="secondary">
                      Browse {service.title.split(' ')[0]} Options
                    </Button>
                    {service.id === 'construction' && (
                      <Button to="/signup" variant="outline">
                        Join as Provider
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification Process */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-primary mb-6">Platform Safety & Verification</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              We verify construction service providers and all clients for platform safety
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">Construction Providers</h3>
              <p className="text-sm text-neutral-600 mb-4">KYC verified before platform access</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  <span className="text-neutral-700">Business registration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  <span className="text-neutral-700">Professional licenses</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  <span className="text-neutral-700">KYC verification</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  <span className="text-neutral-700">Portfolio review</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  <span className="text-neutral-700">Admin approval</span>
                </li>
              </ul>
            </Card>

            <Card>
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">Education Institutions</h3>
              <p className="text-sm text-neutral-600 mb-4">Pre-verified institutions listed</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  <span className="text-neutral-700">Accredited institutions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  <span className="text-neutral-700">Official registration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  <span className="text-neutral-700">Payment plans verified</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  <span className="text-neutral-700">Direct payments to school</span>
                </li>
              </ul>
            </Card>

            <Card>
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">Healthcare Facilities</h3>
              <p className="text-sm text-neutral-600 mb-4">Licensed medical providers</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  <span className="text-neutral-700">Licensed facilities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  <span className="text-neutral-700">Medical registration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  <span className="text-neutral-700">Transparent pricing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  <span className="text-neutral-700">Installment options</span>
                </li>
              </ul>
            </Card>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <Card className="bg-gradient-to-br from-primary-50 to-secondary-50">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-primary mb-2">Client Verification</h3>
                  <p className="text-neutral-700 mb-3">
                    All clients undergo KYC verification for full platform access
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="flex items-center">
                      <span className="text-secondary mr-2">✓</span>
                      Identity verification (KYC)
                    </span>
                    <span className="flex items-center">
                      <span className="text-secondary mr-2">✓</span>
                      Contact validation
                    </span>
                    <span className="flex items-center">
                      <span className="text-secondary mr-2">✓</span>
                      Payment method setup
                    </span>
                    <span className="flex items-center text-neutral-500">
                      <span className="text-neutral-400 mr-2">○</span>
                      <em>Unverified: browse only</em>
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-secondary-100">
              Join Afremit today as a client or service provider
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button to="/signup" variant="secondary" size="lg">
                Join as Client
              </Button>
              <Button to="/signup" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Join as Provider
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
