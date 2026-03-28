import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { useAuth } from '../../context/AuthContext';
import VerificationBadge from './VerificationBadge';
import Icon from './Icon';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [businessDropdownOpen, setBusinessDropdownOpen] = useState(false);
  const [mobileBusinessOpen, setMobileBusinessOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate('/');
  };

  const getKYCStatus = () => {
    if (!user) return null;
    if (user.state === 'VERIFIED' || user.state === 'PUBLISHED') return 'verified';
    if (user.state === 'KYC_PENDING' || user.state === 'KYC_REVIEW') return 'pending';
    return 'incomplete';
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

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
                    <Link to="/insurance/zororo-phumulani" className="block px-4 py-2 hover:bg-secondary-50 hover:text-secondary-700">Zororo Phumulani Insurance</Link>
                    <Link to="/insurance/lookup" className="block px-4 py-2 hover:bg-secondary-50 hover:text-secondary-700 flex items-center gap-2">
                      <Icon name="search" className="w-4 h-4" /> Find Your Policy
                    </Link>
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

            {/* Profile / Auth Section */}
            {isAuthenticated ? (
              <div 
                className="relative"
                onMouseEnter={() => setProfileDropdownOpen(true)}
                onMouseLeave={() => setProfileDropdownOpen(false)}
              >
                <button className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-sm font-bold relative">
                    {getInitials(user?.name || user?.fullName || user?.businessName)}
                    {(user?.state === 'VERIFIED' || user?.state === 'PUBLISHED') && (
                      <div className="absolute -bottom-1 -right-1">
                        <VerificationBadge 
                          type={user?.role === 'provider' ? 'provider' : 'user'} 
                          size="sm" 
                        />
                      </div>
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full right-0 mt-2 w-64 bg-white text-neutral-800 rounded-lg shadow-xl py-2"
                    >
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-neutral-200">
                        <div className="flex items-center space-x-2">
                          <div className="font-semibold text-sm truncate">
                            {user?.name || user?.fullName || user?.businessName}
                          </div>
                          {(user?.state === 'VERIFIED' || user?.state === 'PUBLISHED') && (
                            <VerificationBadge 
                              type={user?.role === 'provider' ? 'provider' : 'user'} 
                              size="sm" 
                            />
                          )}
                        </div>
                        <div className="text-xs text-neutral-500 truncate">{user?.email}</div>
                        
                        {/* KYC Status Indicator */}
                        {getKYCStatus() === 'pending' && (
                          <div className="mt-2 text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded flex items-center gap-1">
                            <Icon name="clock" className="w-3 h-3" /> KYC Verification Pending
                          </div>
                        )}
                        {getKYCStatus() === 'incomplete' && (
                          <div className="mt-2 text-xs bg-red-50 text-red-700 px-2 py-1 rounded flex items-center gap-1">
                            <Icon name="warning" className="w-3 h-3" /> Complete KYC to access services
                          </div>
                        )}
                        {getKYCStatus() === 'verified' && (
                          <div className="mt-2 text-xs bg-green-50 text-green-700 px-2 py-1 rounded flex items-center gap-1">
                            <Icon name="check" className="w-3 h-3" /> Verified Account
                          </div>
                        )}
                      </div>

                      {/* Menu Items */}
                      <Link 
                        to={`/${user?.role}/dashboard`} 
                        className="block px-4 py-2 hover:bg-secondary-50 hover:text-secondary-700 flex items-center gap-2"
                      >
                        <Icon name="dashboard" className="w-4 h-4" /> Dashboard
                      </Link>
                      
                      {getKYCStatus() === 'incomplete' && (
                        <Link 
                          to={user?.role === 'provider' ? '/provider/kyc' : '/client/kyc'} 
                          className="block px-4 py-2 hover:bg-secondary-50 hover:text-secondary-700 text-red-600 flex items-center gap-2"
                        >
                          <Icon name="sparkles" className="w-4 h-4" /> Complete KYC Verification
                        </Link>
                      )}
                      
                      {getKYCStatus() !== 'incomplete' && (
                        <Link 
                          to={user?.role === 'provider' ? '/provider/kyc' : '/client/kyc'} 
                          className="block px-4 py-2 hover:bg-secondary-50 hover:text-secondary-700 flex items-center gap-2"
                        >
                          <Icon name="clipboard" className="w-4 h-4" /> KYC Status
                        </Link>
                      )}
                      
                      <div className="border-t border-neutral-200 my-2"></div>
                      
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-700"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button to="/login" variant="ghost" size="sm" className="text-white hover:text-secondary">
                  Login
                </Button>
                <Button to="/signup" variant="secondary" size="sm">
                  Sign Up
                </Button>
              </div>
            )}
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
                {/* Business Dropdown */}
                <div>
                  <button 
                    onClick={() => setMobileBusinessOpen(!mobileBusinessOpen)}
                    className="flex items-center justify-between w-full py-2 hover:text-secondary"
                  >
                    <span>Business</span>
                    <svg 
                      className={`w-4 h-4 transition-transform ${mobileBusinessOpen ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {mobileBusinessOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-4 space-y-2 mt-2"
                      >
                        <Link 
                          to="/services/construction" 
                          className="block py-2 text-sm hover:text-secondary"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Construction Services
                        </Link>
                        <Link 
                          to="/services/education" 
                          className="block py-2 text-sm hover:text-secondary"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Education Services
                        </Link>
                        <Link 
                          to="/services/healthcare" 
                          className="block py-2 text-sm hover:text-secondary"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Healthcare Services
                        </Link>
                        <div className="border-t border-neutral-700 my-2"></div>
                        <Link 
                          to="/insurance/zororo-phumulani" 
                          className="block py-2 text-sm hover:text-secondary"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Zororo Phumulani Insurance
                        </Link>
                        <Link 
                          to="/insurance/lookup" 
                          className="block py-2 text-sm hover:text-secondary"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Find Your Policy
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <Link to="/how-it-works" className="block py-2 hover:text-secondary">How It Works</Link>
                <Link to="/about" className="block py-2 hover:text-secondary">About Us</Link>
                
                {isAuthenticated ? (
                  <>
                    <div className="border-t border-neutral-700 pt-4 mt-4">
                      <div className="px-2 py-2 text-sm text-neutral-300">
                        {user?.name || user?.fullName || user?.businessName}
                      </div>
                      <Link 
                        to={`/${user?.role}/dashboard`} 
                        className="block py-2 hover:text-secondary"
                      >
                        Dashboard
                      </Link>
                      {getKYCStatus() !== 'verified' && (
                        <Link 
                          to={user?.role === 'provider' ? '/provider/kyc' : '/client/kyc'} 
                          className="block py-2 hover:text-secondary text-yellow-400"
                        >
                          Complete KYC
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left py-2 hover:text-red-400"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Button to="/login" variant="outline" size="sm" className="w-full border-white text-white hover:bg-white hover:text-primary">
                      Login
                    </Button>
                    <Button to="/signup" variant="secondary" size="sm" className="w-full">
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;
