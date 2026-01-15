import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/shared/Navigation';
import Footer from '../components/shared/Footer';

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
