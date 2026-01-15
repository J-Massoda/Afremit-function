import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Select Your Service Provider',
      description: 'Browse our verified list of trusted construction companies and contractors across Africa. All providers are thoroughly vetted and insured.',
      image: '🏗️',
      details: [
        'View provider profiles and ratings',
        'Check credentials and past projects',
        'Read reviews from other clients',
        'Contact providers directly'
      ]
    },
    {
      number: '02',
      title: 'Create Your Contract',
      description: 'Define your construction project with clear milestones. Break down the project into phases with specific deliverables and payment amounts.',
      image: '📝',
      details: [
        'Set project scope and timeline',
        'Define clear milestones',
        'Specify payment amounts per milestone',
        'Include terms and conditions'
      ]
    },
    {
      number: '03',
      title: 'Fund the Escrow',
      description: 'Deposit the total project amount into our secure escrow account. Your money is protected and only released when milestones are completed.',
      image: '💰',
      details: [
        'Secure bank transfer or card payment',
        'Funds held in protected escrow',
        'Real-time balance tracking',
        'Insurance-backed protection'
      ]
    },
    {
      number: '04',
      title: 'Provider Completes Milestone',
      description: 'The service provider works on the first milestone. They submit proof of completion with photos, documents, or other evidence.',
      image: '✅',
      details: [
        'Provider uploads completion evidence',
        'Photo/video documentation',
        'Progress reports',
        'Quality assurance checks'
      ]
    },
    {
      number: '05',
      title: 'You Approve the Work',
      description: 'Review the submitted work and evidence. Approve the milestone if you\'re satisfied, or request revisions if needed.',
      image: '👁️',
      details: [
        'Review documentation',
        'Inspect completed work',
        'Request changes if needed',
        'Final approval or rejection'
      ]
    },
    {
      number: '06',
      title: 'Automatic Payment Release',
      description: 'Once you approve the milestone, payment is automatically released from escrow to the provider. The process repeats for each milestone.',
      image: '🎉',
      details: [
        'Instant fund release',
        'Provider receives payment',
        'Transaction recorded',
        'Move to next milestone'
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-900 text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="mb-6">How Afremit Works</h1>
            <p className="text-xl text-neutral-200">
              Afremit puts control, confidence, and clarity into diaspora construction payments — 
              ensuring your hard-earned money makes a real difference back home.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section bg-neutral-50">
        <div className="container-custom max-w-5xl">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="mb-16 last:mb-0"
            >
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
                {/* Number & Icon */}
                <div className="w-full md:w-1/3 text-center">
                  <div className="inline-block">
                    <div className="text-8xl mb-4">{step.image}</div>
                    <div className="text-6xl font-bold text-accent opacity-20">{step.number}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-2/3">
                  <Card>
                    <h3 className="mb-4 text-primary">{step.title}</h3>
                    <p className="text-neutral-700 mb-6 text-lg">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-neutral-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Key Benefits */}
      <section className="section bg-white">
        <div className="container-custom">
          <h2 className="text-center mb-12">Key Benefits of Milestone Escrow</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🔒', title: 'Secure', description: 'Funds protected until work is done' },
              { icon: '👁️', title: 'Transparent', description: 'Track every milestone and payment' },
              { icon: '⚡', title: 'Fast', description: 'Instant release upon approval' },
              { icon: '🛡️', title: 'Protected', description: 'Insurance-backed guarantee' }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <div className="text-5xl mb-3">{benefit.icon}</div>
                  <h4 className="mb-2">{benefit.title}</h4>
                  <p className="text-neutral-600 text-sm">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-to-br from-secondary to-secondary-700 text-white">
        <div className="container-custom text-center">
          <h2 className="mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-neutral-100 max-w-2xl mx-auto">
            Join our waiting list today and be among the first to experience secure, 
            milestone-based construction payments with Afremit.
          </p>
          <Button to="/signup" variant="accent" size="lg">
            Join Waiting List Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
