import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../utils/auth';
import TopNavbar from '../../components/admin/TopNavbar';
import SideNavbar from '../../components/admin/SideNavbar';
import Footer from '../../components/admin/Footer';
import { Routes, Route } from 'react-router-dom'; // Add routing

// Import Pages
// import Profil from './Profil';
// import Settings from './Settings';

function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true); // State global untuk sidebar

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar with toggle control */}
      <SideNavbar isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <div
        style={{
          marginLeft: sidebarOpen ? '200px' : '50px', // Adjust margin depending on sidebar status
          width: '100%',
          transition: 'margin-left 0.3s ease-in-out', // Smooth transition for margin-left
        }}
      >
        <TopNavbar isSidebarOpen={sidebarOpen} />

        {/* Main Content with margin-top to create space between TopNavbar and the content */}
        <main style={{ padding: '2rem', minHeight: '80vh', marginTop: '60px' }}>
          <Routes>
            <Route path="/" element={<h2>Selamat Datang di Dashboard</h2>} />
            {/* <Route path="/profil" element={<Profil />} /> */}
            {/* <Route path="/settings" element={<Settings />} /> */}
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
