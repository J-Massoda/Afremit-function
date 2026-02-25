import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import HowItWorks from './pages/public/HowItWorks';
import Services from './pages/public/Services';
import ConstructionServices from './pages/public/ConstructionServices';
import EducationServices from './pages/public/EducationServices';
import HealthcareServices from './pages/public/HealthcareServices';
import About from './pages/public/About';
import ZororoPhumulani from './pages/public/ZororoPhumulani';
import ProviderWaitingList from './pages/public/ProviderWaitingList';
import ClientWaitingList from './pages/public/ClientWaitingList';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';

// Insurance Pages
import InsurancePlans from './pages/insurance/InsurancePlans';
import SubscriptionFlow from './pages/insurance/SubscriptionFlow';
import PaymentPage from './pages/insurance/PaymentPage';
import ConfirmationPage from './pages/insurance/ConfirmationPage';

// App Pages (After Login)
import UserDashboard from './pages/app/user/Dashboard';
import CreateContract from './pages/app/user/CreateContract';
import ContractDetails from './pages/app/user/ContractDetails';

import ProviderDashboard from './pages/app/provider/Dashboard';
import ProviderContracts from './pages/app/provider/Contracts';

import AdminDashboard from './pages/app/admin/Dashboard';
import AdminKYCReview from './pages/app/admin/AdminKYCReview';

// Education Admin Pages
import EducationAdminDashboard from './pages/app/admin/EducationAdminDashboard';
import PayerManagement from './pages/app/admin/PayerManagement';
import InstitutionManagement from './pages/app/admin/InstitutionManagement';
import EscrowMonitor from './pages/app/admin/EscrowMonitor';
import ExceptionQueue from './pages/app/admin/ExceptionQueue';
import RevenueMonitor from './pages/app/admin/RevenueMonitor';

// KYC Forms
import ClientKYCForm from './pages/app/user/ClientKYCForm';
import ProviderKYCForm from './pages/app/provider/ProviderKYCForm';

// Provider Directory
import ProviderDirectory from './pages/public/ProviderDirectory';
import ProviderProfile from './pages/public/ProviderProfile';

// Context
import { AuthProvider } from './context/AuthContext';

// Protected Route Component with State Checks
const ProtectedRoute = ({ children, requiredRole, requiresVerified }) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  // Check if user needs to complete KYC
  if (requiresVerified && user.state !== 'VERIFIED' && user.state !== 'PUBLISHED') {
    if (user.role === 'client') {
      return <Navigate to="/client/kyc" replace />;
    } else if (user.role === 'provider') {
      return <Navigate to="/provider/kyc" replace />;
    }
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:category" element={<Services />} />
              <Route path="/services/construction" element={<ConstructionServices />} />
              <Route path="/services/education" element={<EducationServices />} />
              <Route path="/services/healthcare" element={<HealthcareServices />} />
              <Route path="/about" element={<About />} />
              <Route path="/zororo-phumulani" element={<ZororoPhumulani />} />
              <Route path="/provider-signup" element={<ProviderWaitingList />} />
              <Route path="/client-signup" element={<ClientWaitingList />} />
              <Route path="/providers" element={<ProviderDirectory />} />
              <Route path="/providers/search" element={<ProviderDirectory />} />
              <Route path="/providers/:id" element={<ProviderProfile />} />
              
              {/* Insurance Routes */}
              <Route path="/insurance/zororo-phumulani" element={<InsurancePlans />} />
              <Route path="/insurance/subscribe/:planId" element={<SubscriptionFlow />} />
              <Route path="/insurance/payment" element={<PaymentPage />} />
              <Route path="/insurance/confirmation" element={<ConfirmationPage />} />
            </Route>

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* User/Client Routes */}
            <Route element={
              <ProtectedRoute requiredRole="client">
                <DashboardLayout role="client" />
              </ProtectedRoute>
            }>
              <Route path="/client/dashboard" element={<UserDashboard />} />
              <Route path="/client/kyc" element={<ClientKYCForm />} />
              <Route path="/client/create-contract" element={<CreateContract />} />
              <Route path="/client/contract/:id" element={<ContractDetails />} />
            </Route>

            {/* Service Provider Routes */}
            <Route element={
              <ProtectedRoute requiredRole="provider">
                <DashboardLayout role="provider" />
              </ProtectedRoute>
            }>
              <Route path="/provider/dashboard" element={<ProviderDashboard />} />
              <Route path="/provider/kyc" element={<ProviderKYCForm />} />
              <Route path="/provider/contracts" element={<ProviderContracts />} />
            </Route>

            {/* Admin Routes */}
            <Route element={
              <ProtectedRoute requiredRole="admin">
                <DashboardLayout role="admin" />
              </ProtectedRoute>
            }>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/kyc" element={<AdminKYCReview />} />
              
              {/* Education Escrow Admin Routes */}
              <Route path="/admin/education" element={<EducationAdminDashboard />} />
              <Route path="/admin/education/payers" element={<PayerManagement />} />
              <Route path="/admin/education/institutions" element={<InstitutionManagement />} />
              <Route path="/admin/education/escrow-monitor" element={<EscrowMonitor />} />
              <Route path="/admin/education/exceptions" element={<ExceptionQueue />} />
              <Route path="/admin/education/revenue" element={<RevenueMonitor />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </AuthProvider>
  );
}

export default App;
