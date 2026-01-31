import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';
import Icon from '../../components/shared/Icon';

const HealthcareServices = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-secondary text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200')] bg-cover bg-center" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="mb-6">Healthcare Services - Medical Payment Solutions</h1>
            <p className="text-xl md:text-2xl text-secondary-100 mb-8">
              Browse verified healthcare facilities across Sub-Saharan Africa. 
              Pay medical bills directly with flexible payment options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button to="/client-signup" variant="secondary" size="lg">
                Find Healthcare Providers
              </Button>
              <Button to="/provider-signup" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Register Your Facility
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How Healthcare Payments Work */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-primary mb-6">Direct Healthcare Payments with Flexibility</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Pay medical bills directly to healthcare facilities. Choose between upfront payment 
              or installment plans for major medical expenses.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-secondary-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-primary mb-6">How It Works</h3>
                <ol className="space-y-4">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold mr-4">1</span>
                    <div>
                      <h4 className="font-semibold text-primary">Select Service Type</h4>
                      <p className="text-neutral-600">Choose between consultation, treatment, surgery, or emergency care</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold mr-4">2</span>
                    <div>
                      <h4 className="font-semibold text-primary">Browse Healthcare Facilities</h4>
                      <p className="text-neutral-600">Find hospitals and clinics by location and specialization</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold mr-4">3</span>
                    <div>
                      <h4 className="font-semibold text-primary">View Pricing & Payment Options</h4>
                      <p className="text-neutral-600">See transparent costs and choose direct or installment payment</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold mr-4">4</span>
                    <div>
                      <h4 className="font-semibold text-primary">Complete Payment to Facility</h4>
                      <p className="text-neutral-600">Pay directly through Afremit and receive care confirmation</p>
                    </div>
                  </li>
                </ol>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600" 
                  alt="Hospital corridor" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="text-4xl font-bold text-secondary">24/7</div>
                <div className="text-sm text-neutral-600">Healthcare Access</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Healthcare Services Available */}
      <section className="section bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-primary mb-6">Medical Services on Afremit</h2>
            <p className="text-xl text-neutral-600">
              From routine checkups to specialized treatments - all with direct payment options
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'General Healthcare',
                icon: 'medical',
                services: ['Routine consultations', 'Diagnostic tests', 'Prescriptions', 'Vaccinations'],
                image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400'
              },
              {
                title: 'Specialized Treatment',
                icon: 'medical',
                services: ['Surgical procedures', 'Chronic disease care', 'Physiotherapy', 'Mental health services'],
                image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400'
              },
              {
                title: 'Emergency Services',
                icon: 'medical',
                services: ['Emergency care', 'Urgent treatment', 'Ambulance services', 'Critical care'],
                image: 'https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?w=400'
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden">
                  <div className="aspect-video overflow-hidden rounded-t-xl -m-6 mb-4">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="mb-4 flex justify-start">
                    <Icon name={service.icon} className="w-12 h-12 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-4">{service.title}</h3>
                  <ul className="space-y-2">
                    {service.services.map((item, idx) => (
                      <li key={idx} className="flex items-center text-neutral-700">
                        <svg className="w-5 h-5 text-secondary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Plans Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-primary mb-6">Flexible Payment Options</h2>
            <p className="text-xl text-neutral-600">Choose the payment plan that works for you</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="text-center h-full bg-primary-50">
                <div className="mb-4 flex justify-center">
                  <Icon name="creditCard" className="w-12 h-12 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">Direct Payment</h3>
                <p className="text-neutral-700 mb-6">
                  Pay the full amount upfront for immediate treatment
                </p>
                <ul className="space-y-3 text-left">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-secondary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Instant confirmation
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-secondary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    No additional fees
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-secondary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Ideal for routine care
                  </li>
                </ul>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="text-center h-full bg-secondary-50">
                <div className="mb-4 flex justify-center">
                  <Icon name="chart" className="w-12 h-12 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">Installment Plans</h3>
                <p className="text-neutral-700 mb-6">
                  Spread payments over time for major medical expenses
                </p>
                <ul className="space-y-3 text-left">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-secondary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Flexible terms available
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-secondary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Transparent fee structure
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-secondary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Perfect for surgeries
                  </li>
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section bg-neutral-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400" alt="Doctor consultation" className="rounded-xl shadow-lg" />
                <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400" alt="Medical care" className="rounded-xl shadow-lg mt-8" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-primary mb-6">Why Use Afremit for Healthcare?</h2>
              <div className="space-y-6">
                {[
                  { title: 'Direct to Facility', desc: 'Payments go straight to hospitals and clinics - no intermediaries' },
                  { title: 'Verified Healthcare Providers', desc: 'All facilities are licensed and pre-verified' },
                  { title: 'Transparent Costs', desc: 'See exact medical costs before making any payment' },
                  { title: 'Payment Flexibility', desc: 'Choose between full payment or installments for major procedures' },
                  { title: 'Care Confirmation', desc: 'Receive appointment and treatment confirmations instantly' },
                  { title: 'Support from Abroad', desc: 'Family in diaspora can pay medical bills directly' }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-1">{benefit.title}</h4>
                      <p className="text-neutral-600">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6">Ready to Pay Healthcare Bills Securely?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-secondary-100">
              Join our waiting list to access verified healthcare facilities with flexible payment options
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button to="/client-signup" variant="secondary" size="lg">
                Join Waiting List (Patients)
              </Button>
              <Button to="/provider-signup" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Register Your Healthcare Facility
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HealthcareServices;
