import React from 'react';
import SmokeBackground from './SmokeBackground';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <SmokeBackground />
      {children}
    </div>
  );
};

export default Layout; 