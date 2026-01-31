import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';
import Icon from '../../components/shared/Icon';

const About = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: 'What is Afremit?',
      answer: 'Afremit is a secure payment platform designed specifically for diaspora communities to safely send money for construction projects and other services in Africa. We use milestone-based escrow to protect both senders and service providers.'
    },
    {
      question: 'How does the escrow system work?',
      answer: 'When you create a contract, you deposit the full amount into our secure escrow account. Funds are only released to the service provider when specific milestones are completed and approved by you. This ensures your money is protected until work is done to your satisfaction.'
    },
    {
      question: 'What is a milestone?',
      answer: 'A milestone is a specific, measurable phase of your project. For example, in construction: foundation complete, walls erected, roof installed, etc. Each milestone has a defined payment amount and must be approved before funds are released.'
    },
    {
      question: 'Are service providers verified?',
      answer: 'Yes! All service providers on Afremit go through a thorough verification process. We check credentials, past work, insurance, and conduct background checks to ensure you work with trustworthy professionals.'
    },
    {
      question: 'What happens if I\'m not satisfied with the work?',
      answer: 'You have the power to reject milestone submissions if work doesn\'t meet your expectations. The provider must fix issues before you approve and release payment. We also offer dispute resolution services if needed.'
    },
    {
      question: 'Is my money insured?',
      answer: 'Yes! Through our partnership with Zororo Phumulani Insurance, your escrowed funds have additional protection. This provides extra peace of mind for your transactions.'
    },
    {
      question: 'What currencies do you support?',
      answer: 'We support major currencies including USD, GBP, and EUR for sending, with conversion to local African currencies for service providers. Real-time exchange rates are provided with transparent fees.'
    },
    {
      question: 'How long does payment release take?',
      answer: 'Once you approve a milestone, payment is released instantly to the service provider. There are no delays or waiting periods.'
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
            <h1 className="mb-6">About Afremit</h1>
            <p className="text-xl text-neutral-200">
              Bridging the distance between diaspora communities and their homes through 
              secure, transparent construction payments
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="section bg-white">
        <div className="container-custom max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-6">Our Mission</h2>
              <p className="text-lg text-neutral-700 mb-4">
                We understand the challenges faced by Africans living abroad who want to invest 
                in construction projects back home. The fear of fraud, mismanagement, and lack of 
                transparency has prevented many from supporting their communities.
              </p>
              <p className="text-lg text-neutral-700">
                Afremit solves this by providing a secure, milestone-based escrow platform that 
                protects your money until work is verified and completed. We give you control, 
                transparency, and peace of mind.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-secondary-50 to-accent-50 p-8 rounded-2xl"
            >
              <div className="space-y-6">
                {[
                  { icon: 'target', title: 'Transparency', description: 'Track every milestone and payment' },
                  { icon: 'lock', title: 'Security', description: 'Escrow-protected transactions' },
                  { icon: 'users', title: 'Trust', description: 'Verified service providers' },
                  { icon: 'location', title: 'Impact', description: 'Supporting African development' }
                ].map((value, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <Icon name={value.icon} className="w-10 h-10 text-accent" />
                    <div>
                      <h4 className="mb-1">{value.title}</h4>
                      <p className="text-neutral-600 text-sm">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How We Protect You */}
      <section className="section bg-neutral-50">
        <div className="container-custom">
          <h2 className="text-center mb-12">How We Protect You</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Escrow Protection',
                description: 'Your funds are held securely until milestones are completed and approved. No upfront payments to providers.',
                icon: 'shield'
              },
              {
                title: 'Verified Providers',
                description: 'All service providers undergo thorough background checks, credential verification, and insurance validation.',
                icon: 'check'
              },
              {
                title: 'Insurance Partnership',
                description: 'Additional protection through our partnership with Zororo Phumulani Insurance for extra peace of mind.',
                icon: 'bank'
              },
              {
                title: 'Milestone Approval',
                description: 'You control when payments are released. Approve only after verifying completed work.',
                icon: 'eye'
              },
              {
                title: 'Dispute Resolution',
                description: 'Professional mediation services available if disagreements arise between you and the provider.',
                icon: 'balance'
              },
              {
                title: 'Full Transparency',
                description: 'Track every transaction, milestone, and payment in real-time through your dashboard.',
                icon: 'chart'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center">
                  <div className="mb-4 flex justify-center">
                    <Icon name={feature.icon} className="w-12 h-12 text-accent" />
                  </div>
                  <h4 className="mb-3">{feature.title}</h4>
                  <p className="text-neutral-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="bg-neutral-50 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-neutral-100 transition-colors"
                  >
                    <span className="font-semibold text-lg pr-4">{faq.question}</span>
                    <svg
                      className={`w-6 h-6 transform transition-transform flex-shrink-0 ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-4"
                    >
                      <p className="text-neutral-700">{faq.answer}</p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section bg-gradient-to-br from-secondary to-secondary-700 text-white">
        <div className="container-custom max-w-3xl text-center">
          <h2 className="mb-6">Still Have Questions?</h2>
          <p className="text-xl mb-8 text-neutral-100">
            Our team is here to help. Reach out to us and we'll get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button variant="accent" size="lg" href="mailto:partners@afremit.com">
              Email Us
            </Button>
            <Button variant="ghost" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-secondary">
              Call +27 63 562 9324
            </Button>
          </div>
          <p className="text-sm text-neutral-200">
            Unit 1 Sundowners Creek, Hole In One Street<br />
            Willowbrook 1724, Johannesburg, South Africa
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
