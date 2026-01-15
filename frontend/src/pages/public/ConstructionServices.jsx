import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';

const ConstructionServices = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <section className="relative bg-gradient-to-br from-primary to-secondary text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200')] bg-cover bg-center" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="mb-6">Construction Services with Escrow Protection</h1>
            <p className="text-xl md:text-2xl text-secondary-100 mb-8">
              Connect with verified construction professionals across Sub-Saharan Africa. 
              Pay securely with milestone-based escrow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button to="/provider-signup" variant="secondary" size="lg">
                Join as Provider
              </Button>
              <Button to="/client-signup" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Find Contractors
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How Construction Escrow Works */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-primary mb-6">Milestone-Based Escrow Protection</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Your construction payments are held securely until you approve each phase of work. 
              No more worries about misused funds or incomplete projects.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
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
                      <h4 className="font-semibold text-primary">Submit Your Project</h4>
                      <p className="text-neutral-600">Describe your construction project with details and requirements</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold mr-4">2</span>
                    <div>
                      <h4 className="font-semibold text-primary">Receive Quote with Milestones</h4>
                      <p className="text-neutral-600">Verified contractor sends detailed quote broken into phases</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold mr-4">3</span>
                    <div>
                      <h4 className="font-semibold text-primary">Deposit First Milestone</h4>
                      <p className="text-neutral-600">Funds held in secure escrow until work is completed</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold mr-4">4</span>
                    <div>
                      <h4 className="font-semibold text-primary">Approve & Release Payment</h4>
                      <p className="text-neutral-600">Review completed work, approve, and funds automatically release</p>
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
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600" 
                  alt="Construction site" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="text-4xl font-bold text-secondary">100%</div>
                <div className="text-sm text-neutral-600">Escrow Protected</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Construction Services Offered */}
      <section className="section bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-primary mb-6">Construction Services Available</h2>
            <p className="text-xl text-neutral-600">
              From residential homes to commercial projects - all with milestone protection
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Residential Construction',
                icon: '🏠',
                services: ['New home builds', 'Home extensions', 'Kitchen & bathroom renovations', 'Roofing and repairs'],
                image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400'
              },
              {
                title: 'Commercial Projects',
                icon: '🏢',
                services: ['Office buildings', 'Retail spaces', 'Warehouses', 'Restaurant fit-outs'],
                image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400'
              },
              {
                title: 'Infrastructure & Trades',
                icon: '🔧',
                services: ['Electrical installations', 'Plumbing systems', 'HVAC installations', 'Landscaping works'],
                image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400'
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
                  <div className="text-5xl mb-4">{service.icon}</div>
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

      {/* Benefits Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400" alt="Construction team" className="rounded-xl shadow-lg" />
                <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400" alt="Building site" className="rounded-xl shadow-lg mt-8" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <h2 className="text-primary mb-6">Why Use Afremit for Construction?</h2>
              <div className="space-y-6">
                {[
                  { title: 'Verified Contractors', desc: 'Every construction provider undergoes thorough KYC and business verification' },
                  { title: 'Milestone Protection', desc: 'Pay only when work is completed to your satisfaction' },
                  { title: 'No Misused Funds', desc: 'Money stays in escrow until you approve - no more unauthorized spending' },
                  { title: 'Transparent Process', desc: 'Track project progress and milestone completions in real-time' },
                  { title: 'Dispute Resolution', desc: 'Built-in support for resolving any project disagreements' }
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
            <h2 className="mb-6">Ready to Start Your Construction Project?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-secondary-100">
              Join our waiting list and be among the first to experience secure, milestone-based construction payments
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button to="/client-signup" variant="secondary" size="lg">
                Join Waiting List (Clients)
              </Button>
              <Button to="/provider-signup" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Register as Contractor
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ConstructionServices;
