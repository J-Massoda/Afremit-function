import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [businessDropdownOpen, setBusinessDropdownOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary text-white shadow-lg">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold">A</span>
            </div>
            <span className="text-xl font-bold font-heading">Afremit</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Business Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setBusinessDropdownOpen(true)}
              onMouseLeave={() => setBusinessDropdownOpen(false)}
            >
              <button className="flex items-center space-x-1 hover:text-secondary transition-colors">
                <span>Business</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <AnimatePresence>
                {businessDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white text-neutral-800 rounded-lg shadow-xl py-2"
                  >
                    <Link to="/services/construction" className="block px-4 py-2 hover:bg-secondary-50 hover:text-secondary-700">Construction Services</Link>
                    <Link to="/services/education" className="block px-4 py-2 hover:bg-secondary-50 hover:text-secondary-700">Education Services</Link>
                    <Link to="/services/healthcare" className="block px-4 py-2 hover:bg-secondary-50 hover:text-secondary-700">Healthcare Services</Link>
                    <div className="border-t border-neutral-200 my-2"></div>
                    <Link to="/zororo-phumulani" className="block px-4 py-2 hover:bg-secondary-50 hover:text-secondary-700">Zororo Phumulani Insurance</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              to="/how-it-works" 
              className={`hover:text-secondary transition-colors ${isActive('/how-it-works') ? 'text-secondary' : ''}`}
            >
              How It Works
            </Link>
            
            <Link 
              to="/about" 
              className={`hover:text-secondary transition-colors ${isActive('/about') ? 'text-secondary' : ''}`}
            >
              About Us
            </Link>

            <Button to="/client-signup" variant="secondary" size="sm">
              Join Waiting List
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4">
                <Link to="/services" className="block py-2 hover:text-secondary">Business</Link>
                <Link to="/how-it-works" className="block py-2 hover:text-secondary">How It Works</Link>
                <Link to="/about" className="block py-2 hover:text-secondary">About Us</Link>
                <Button to="/client-signup" variant="secondary" size="sm" className="w-full">
                  Join Waiting List
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;
