import React from 'react';
import { motion } from 'framer-motion';

const PartnerBannerSlider = () => {
  const partners = [
    {
      id: 1,
      name: 'PayNow',
      description: 'Secure payments',
      accentColor: 'text-blue-600',
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    {
      id: 2,
      name: 'EcoCash',
      description: 'Mobile wallets',
      accentColor: 'text-green-600',
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 3,
      name: 'Stripe',
      description: 'Global payments',
      accentColor: 'text-purple-600',
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      id: 4,
      name: 'WhatsApp',
      description: 'Communication',
      accentColor: 'text-emerald-600',
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 5,
      name: 'AWS',
      description: 'Cloud services',
      accentColor: 'text-orange-600',
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 19H4a1 1 0 01-1-1v-1a6 6 0 0113 0v1a1 1 0 01-1 1h-1m-7 0H7a1 1 0 001-1v-1c0-2.412-1.888-4.402-4.291-4.434A4 4 0 005 8.5M11 19h1" />
        </svg>
      )
    },
    {
      id: 6,
      name: 'GitHub',
      description: 'Code repository',
      accentColor: 'text-slate-600',
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    }
  ];

  // Create enough duplicates for seamless infinite loop
  const duplicatedPartners = [...partners, ...partners, ...partners, ...partners];

  return (
    <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-6 md:py-8 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8 px-4">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2"
          >
            Trusted Partners
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-300 text-xs md:text-sm max-w-2xl mx-auto"
          >
            Partnering with industry leaders to deliver secure, scalable solutions
          </motion.p>
        </div>

        {/* Continuous Slider */}
        <div className="relative overflow-hidden">
          {/* Fade overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-slate-900 to-transparent z-20"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-slate-900 to-transparent z-20"></div>

          {/* Continuous scrolling container */}
          <motion.div
            className="flex gap-6 md:gap-8 lg:gap-12 px-4 py-4"
            animate={{ 
              x: [0, -2000]
            }}
            transition={{
              duration: 80,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            }}
          >
            {duplicatedPartners.map((partner, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 flex flex-col items-center gap-2 md:gap-3 group cursor-pointer"
                whileHover={{ scale: 1.1, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Icon container */}
                <div className={`${partner.accentColor} p-3 md:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-white/30 group-hover:bg-white/10 transition-all duration-300`}>
                  <motion.div
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2 }}
                  >
                    {partner.icon}
                  </motion.div>
                </div>

                {/* Label */}
                <div className="text-center">
                  <p className="text-white text-xs md:text-sm font-semibold whitespace-nowrap">
                    {partner.name}
                  </p>
                  <p className="text-slate-400 text-xs whitespace-nowrap">
                    {partner.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PartnerBannerSlider;
