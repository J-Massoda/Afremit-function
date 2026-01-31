import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from './Button';
import Icon from './Icon';
import { useAuth } from '../../context/AuthContext';

const KYCStatusBanner = () => {
  const { user } = useAuth();

  if (!user) return null;

  const getKYCStatus = () => {
    if (user.state === 'VERIFIED' || user.state === 'PUBLISHED') return 'verified';
    if (user.state === 'KYC_PENDING' || user.state === 'KYC_REVIEW') return 'pending';
    if (user.state === 'EMAIL_VERIFIED' || user.state === 'DOCUMENTS_SUBMITTED') return 'incomplete';
    if (user.state === 'REGISTERED' || user.state === 'APPLIED') return 'email_verification';
    return null;
  };

  const status = getKYCStatus();

  if (status === 'verified') return null;

  const bannerConfig = {
    email_verification: {
      bg: 'bg-yellow-50 border-yellow-200',
      text: 'text-yellow-800',
      icon: 'mail',
      title: 'Verify Your Email',
      message: 'Please check your email and verify your account to continue.',
      showButton: false
    },
    incomplete: {
      bg: 'bg-orange-50 border-orange-200',
      text: 'text-orange-800',
      icon: 'warning',
      title: 'Complete KYC Verification',
      message: 'Submit your KYC documents to access all services and connect with verified providers.',
      buttonText: 'Complete KYC Now',
      buttonLink: user.role === 'provider' ? '/provider/kyc' : '/client/kyc'
    },
    pending: {
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-800',
      icon: 'clock',
      title: 'KYC Verification Pending',
      message: 'Your KYC documents are under review. This typically takes 1-2 business days.',
      showButton: false
    }
  };

  const config = bannerConfig[status];
  if (!config) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${config.bg} border-b-2 ${config.text}`}
    >
      <div className="container-custom py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Icon name={config.icon} className="w-6 h-6" />
            <div>
              <h3 className="font-bold text-sm md:text-base">{config.title}</h3>
              <p className="text-xs md:text-sm opacity-90">{config.message}</p>
            </div>
          </div>
          {config.buttonText && config.buttonLink && (
            <Link to={config.buttonLink}>
              <Button variant="primary" size="sm">
                {config.buttonText}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default KYCStatusBanner;
