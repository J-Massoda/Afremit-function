import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';

const AnimatedSection = ({ children, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.6, delay }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
    >
      {children}
    </motion.div>
  );
};

const LandingPage = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white flex items-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 0%, transparent 50%)',
          }} />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6 leading-tight"
            >
              Secure Payments with{' '}
              <span className="text-secondary">Verified Service Providers</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 text-neutral-200 max-w-3xl mx-auto"
            >
              Connect with verified service providers in Construction, Education, and Healthcare. 
              Pay securely with milestone-based escrow protection for every transaction.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button to="/client-signup" variant="secondary" size="lg">
                Join Waiting List
              </Button>
              <Button to="/how-it-works" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Learn How It Works
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="section bg-white">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="mb-4">Connecting You with Trusted Services</h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Afremit connects clients with verified providers in Construction (escrow-protected), 
                Education (direct school payments), and Healthcare (direct/installment payments).
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🏗️',
                title: 'Construction Escrow',
                description: 'Milestone-based escrow protection. Pay as work is completed and approved by you.'
              },
              {
                icon: '📚',
                title: 'Education Payments',
                description: 'Browse schools across Sub-Saharan Africa. Pay tuition directly per semester or annually.'
              },
              {
                icon: '🏥',
                title: 'Healthcare Services',
                description: 'Access medical services. Pay directly or through installment plans from facilities.'
              }
            ].map((feature, index) => (
              <AnimatedSection key={index} delay={index * 0.2}>
                <Card className="text-center h-full">
                  <div className="text-6xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl mb-3">{feature.title}</h3>
                  <p className="text-neutral-600">{feature.description}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="section bg-gradient-to-br from-secondary-50 to-primary-50">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="mb-4">How Construction Escrow Works</h2>
              <p className="text-xl text-neutral-600">
                Milestone-based payments with escrow protection for construction projects
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-1 bg-secondary opacity-30" style={{ top: '3rem' }} />
            
            {[
              {
                step: '1',
                title: 'Provider Sends Quote',
                description: 'Construction provider reviews your project and sends detailed quote with milestones'
              },
              {
                step: '2',
                title: 'Deposit First Milestone',
                description: 'Agree to terms and deposit first milestone payment into secure escrow'
              },
              {
                step: '3',
                title: 'Milestone-Based Releases',
                description: 'Funds released as each milestone is completed and approved by client'
              }
            ].map((step, index) => (
              <AnimatedSection key={index} delay={index * 0.2}>
                <div className="relative">
                  <div className="bg-secondary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                    {step.step}
                  </div>
                  <Card className="text-center">
                    <h4 className="mb-3">{step.title}</h4>
                    <p className="text-neutral-600">{step.description}</p>
                  </Card>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.6}>
            <div className="text-center mt-12">
              <Button to="/how-it-works" variant="secondary" size="lg">
                See Full Process
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-white">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="text-center mb-16">Why Choose Afremit</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'KYC Verified Providers',
                description: 'Construction providers undergo thorough business verification before approval. Schools and hospitals are pre-verified institutions.',
                icon: '✅'
              },
              {
                title: 'User Verification',
                description: 'Clients complete KYC to access services. Unverified users can browse available providers and institutions.',
                icon: '🔒'
              },
              {
                title: 'Multiple Payment Options',
                description: 'Construction uses escrow, education offers direct semester/annual payments, healthcare provides direct or installment options.',
                icon: '💳'
              },
              {
                title: 'Sub-Saharan Africa Focus',
                description: 'Connecting diaspora and local clients with verified services across Sub-Saharan Africa.',
                icon: '🌍'
              },
              {
                title: 'Insurance Available',
                description: 'Optional insurance coverage through Zororo Phumulani for added protection on your projects.',
                icon: '🛡️'
              },
              {
                title: 'Transparent Process',
                description: 'Track construction milestones or view education/healthcare payment schedules with full visibility.',
                icon: '💡'
              }
            ].map((feature, index) => (
              <AnimatedSection key={index} delay={(index % 3) * 0.15}>
                <Card hoverable className="h-full">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h4 className="mb-3">{feature.title}</h4>
                  <p className="text-neutral-600">{feature.description}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container-custom">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="mb-6">Ready to Access Verified Services?</h2>
              <p className="text-xl mb-8 text-neutral-200">
                Whether you need construction work with escrow protection, direct school tuition payments, 
                or healthcare services with flexible payment options - Afremit connects you with trusted providers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button to="/client-signup" variant="secondary" size="lg">
                  Join Waiting List
                </Button>
                <Button to="/about" variant="ghost" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-primary">
                  Learn More About Us
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
