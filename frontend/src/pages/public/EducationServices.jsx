import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';

const EducationServices = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-secondary text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200')] bg-cover bg-center" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="mb-6">Education Services - Direct School Payments</h1>
            <p className="text-xl md:text-2xl text-secondary-100 mb-8">
              Browse verified educational institutions across Sub-Saharan Africa. 
              Pay tuition fees directly to schools - per semester or full year.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button to="/client-signup" variant="secondary" size="lg">
                Browse Schools
              </Button>
              <Button to="/provider-signup" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Register Your Institution
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How Education Payments Work */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-primary mb-6">Direct Payment to Educational Institutions</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              No more worrying if school fees are being misused. Pay directly to the institution 
              and receive enrollment confirmation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600" 
                  alt="Students studying" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="text-4xl font-bold text-secondary">Direct</div>
                <div className="text-sm text-neutral-600">to Institution</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-primary mb-6">How It Works</h3>
                <ol className="space-y-4">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold mr-4">1</span>
                    <div>
                      <h4 className="font-semibold text-primary">Browse Schools</h4>
                      <p className="text-neutral-600">Search by country, region, or institution name</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold mr-4">2</span>
                    <div>
                      <h4 className="font-semibold text-primary">View Tuition & Payment Plans</h4>
                      <p className="text-neutral-600">See clear pricing and choose semester or annual payment</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold mr-4">3</span>
                    <div>
                      <h4 className="font-semibold text-primary">Complete Payment</h4>
                      <p className="text-neutral-600">Pay directly to the school through Afremit</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold mr-4">4</span>
                    <div>
                      <h4 className="font-semibold text-primary">Receive Confirmation</h4>
                      <p className="text-neutral-600">Get enrollment confirmation directly from institution</p>
                    </div>
                  </li>
                </ol>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Educational Institutions Available */}
      <section className="section bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-primary mb-6">Educational Institutions on Afremit</h2>
            <p className="text-xl text-neutral-600">
              From primary schools to universities - all verified and accredited
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Universities & Colleges',
                icon: '🎓',
                details: ['Undergraduate programs', 'Postgraduate studies', 'Professional degrees', 'Online courses'],
                image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400'
              },
              {
                title: 'Secondary Schools',
                icon: '📖',
                details: ['High schools', 'Boarding schools', 'Day schools', 'International curricula'],
                image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400'
              },
              {
                title: 'Vocational Training',
                icon: '💼',
                details: ['Technical colleges', 'Skills development', 'Professional certifications', 'Trade schools'],
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400'
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden">
                  <div className="aspect-video overflow-hidden rounded-t-xl -m-6 mb-4">
                    <img src={category.image} alt={category.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h3 className="text-2xl font-bold text-primary mb-4">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.details.map((item, idx) => (
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

      {/* Benefits for Parents/Students */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-primary mb-6">Why Pay School Fees Through Afremit?</h2>
              <div className="space-y-6">
                {[
                  { title: 'No Misused Funds', desc: 'Money goes directly to the school - not through intermediaries' },
                  { title: 'Transparent Pricing', desc: 'See exact tuition fees and payment schedules upfront' },
                  { title: 'Flexible Payment Plans', desc: 'Choose per semester or annual payment options' },
                  { title: 'Verified Institutions', desc: 'All schools are accredited and pre-verified' },
                  { title: 'Payment Confirmation', desc: 'Receive instant confirmation when school receives payment' },
                  { title: 'Diaspora-Friendly', desc: 'Pay from anywhere in the world with multiple currencies' }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400" alt="Students learning" className="rounded-xl shadow-lg" />
                <img src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400" alt="Graduation" className="rounded-xl shadow-lg mt-8" />
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
            <h2 className="mb-6">Ready to Pay School Fees Directly?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-secondary-100">
              Join our waiting list to access verified educational institutions across Sub-Saharan Africa
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button to="/client-signup" variant="secondary" size="lg">
                Join Waiting List (Parents/Students)
              </Button>
              <Button to="/provider-signup" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Register Your School
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EducationServices;
