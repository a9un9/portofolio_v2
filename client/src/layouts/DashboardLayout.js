import React from 'react';
import TopNavbar from '../components/TopNavbar';
import SideNavbar from '../components/SideNavbar';
import Footer from '../components/Footer';

function DashboardLayout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <SideNavbar />
      <div style={{ marginLeft: '200px', width: '100%' }}>
        <TopNavbar />
        <main style={{ padding: '2rem', minHeight: '80vh' }}>{children}</main>
        <Footer />
      </div>
    </div>
  );
}

export default DashboardLayout;
