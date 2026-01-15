import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import Input, { Select } from '../../components/shared/Input';
import Button from '../../components/shared/Button';

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: 'client',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    country: 'South Africa'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    const result = await signup(formData);
    
    if (result.success) {
      navigate(`/${result.user.role}/dashboard`);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-900 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-white">A</span>
          </div>
          <span className="text-2xl font-bold font-heading text-white">Afremit</span>
        </Link>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-center mb-2 text-primary">Join Afremit</h2>
          <p className="text-center text-neutral-600 mb-8">
            {step === 1 ? 'Choose your account type' : 'Complete your registration'}
          </p>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${step >= 1 ? 'text-secondary' : 'text-neutral-400'}`}>
                Step 1
              </span>
              <span className={`text-sm font-medium ${step >= 2 ? 'text-secondary' : 'text-neutral-400'}`}>
                Step 2
              </span>
            </div>
            <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: step === 1 ? '50%' : '100%' }}
                transition={{ duration: 0.3 }}
                className="h-full bg-secondary"
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                {/* Role Selection */}
                <div
                  onClick={() => handleRoleSelect('client')}
                  className="p-6 border-2 border-neutral-200 rounded-xl cursor-pointer hover:border-secondary hover:bg-secondary-50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">👤</div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-2">I'm a Client</h4>
                      <p className="text-neutral-600 text-sm">
                        I want to hire service providers for construction projects or other services
                      </p>
                    </div>
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                <div
                  onClick={() => handleRoleSelect('provider')}
                  className="p-6 border-2 border-neutral-200 rounded-xl cursor-pointer hover:border-secondary hover:bg-secondary-50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">🏗️</div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-2">I'm a Service Provider</h4>
                      <p className="text-neutral-600 text-sm">
                        I provide construction or other services and want to connect with diaspora clients
                      </p>
                    </div>
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <p className="text-neutral-600 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-secondary font-semibold hover:underline">
                      Login
                    </Link>
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {error}
                  </div>
                )}

                <Input
                  label="Full Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />

                  <Input
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+27 123 456 789"
                    required
                  />
                </div>

                <Select
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  options={[
                    { label: 'South Africa', value: 'South Africa' },
                    { label: 'Nigeria', value: 'Nigeria' },
                    { label: 'Kenya', value: 'Kenya' },
                    { label: 'Ghana', value: 'Ghana' },
                    { label: 'Other', value: 'Other' }
                  ]}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                  />

                  <Input
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input type="checkbox" required className="mt-1" />
                  <p className="text-sm text-neutral-600">
                    I agree to the{' '}
                    <Link to="/terms" className="text-secondary hover:underline">Terms of Service</Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-secondary hover:underline">Privacy Policy</Link>
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    className="flex-1"
                    disabled={loading}
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
