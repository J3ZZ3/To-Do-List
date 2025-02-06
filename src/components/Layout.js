import React from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import SmokeBackground from './SmokeBackground';

const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="layout">
      {!isAuthPage && <Navigation />}
      <SmokeBackground />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout; 