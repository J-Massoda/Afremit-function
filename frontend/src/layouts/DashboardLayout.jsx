import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Icon from '../components/shared/Icon';

const DashboardLayout = ({ role }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigation = {
    client: [
      { name: 'Dashboard', path: '/client/dashboard', icon: 'dashboard' },
      { name: 'Create Contract', path: '/client/create-contract', icon: 'edit' },
      { name: 'My Contracts', path: '/client/dashboard', icon: 'document' },
    ],
    provider: [
      { name: 'Dashboard', path: '/provider/dashboard', icon: 'dashboard' },
      { name: 'Contracts', path: '/provider/contracts', icon: 'document' },
      { name: 'Earnings', path: '/provider/dashboard', icon: 'money' },
    ],
    admin: [
      { name: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' },
      { name: 'Approve Providers', path: '/admin/dashboard', icon: 'check' },
      { name: 'Manage Contracts', path: '/admin/dashboard', icon: 'edit' },
    ],
  };

  const navItems = navigation[role] || [];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-neutral-200 h-16">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-neutral-100 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-white">A</span>
              </div>
              <span className="text-lg font-bold font-heading text-primary">Afremit</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-neutral-800">{user?.name || 'User'}</p>
              <p className="text-xs text-neutral-500 capitalize">{role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-danger hover:bg-red-50 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 256 : 0 }}
        className="fixed top-16 left-0 bottom-0 bg-white border-r border-neutral-200 overflow-hidden z-30"
      >
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-secondary text-white'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                <Icon name={item.icon} className="w-5 h-5" />
                <span className="font-medium whitespace-nowrap">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? 'pl-64' : 'pl-0'
        }`}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
