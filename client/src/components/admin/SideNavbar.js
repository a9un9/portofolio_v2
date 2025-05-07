import React, { useState, useEffect } from 'react';
import { 
  FaGraduationCap, 
  FaAddressCard, 
  FaUser, 
  FaTasks, 
  FaTachometerAlt, 
  FaChevronDown, 
  FaChevronUp, 
  FaBriefcase,
  FaTools,
  FaUserFriends,
  FaEnvelope
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

function SideNavbar({ isOpen, toggle }) {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [username, setUsername] = useState('User');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.username) {
      setUsername(storedUser.username);
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile && isOpen) {
      toggle();
    } else if (!isMobile && !isOpen) {
      toggle();
    }
  }, [isMobile, isOpen, toggle]);

  // Biar kalau sedang di halaman /teknis atau /non-teknis, dropdown otomatis terbuka
  useEffect(() => {
    if (location.pathname.includes('/teknis') || location.pathname.includes('/non-teknis')) {
      setDropdownOpen(true);
    }
  }, [location.pathname]);

  return (
    <nav
      style={{
        width: isOpen ? '208px' : '60px',
        background: '#1f2937',
        color: '#fff',
        height: '100vh',
        paddingTop: '1rem',
        position: 'fixed',
        top: 0,
        left: 0,
        transition: 'width 0.3s',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: isOpen ? 'flex-start' : 'center',
      }}
    >
      {/* Portofolio Title */}
      <div
        style={{
          backgroundColor: '#1f2937',
          color: '#fff',
          fontWeight: 'bold',
          padding: '5px 5px',
          textAlign: 'center',
          marginBottom: '10px',
          width: '100%',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
          fontFamily: 'Arial, sans-serif',
          textTransform: 'uppercase',
          borderBottom: '4px solid #3b82f6',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '22px',
            transition: 'font-size 0.3s ease',
          }}
        >
          {isOpen ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', lineHeight: '1.2' }}>
              <span style={{ fontSize: '22px' }}>Portofolio</span>
              <span style={{ fontSize: '14px', textTransform: 'capitalize' }}>{username}</span>
            </div>
          ) : (
            <img 
              src="/favicon.ico" 
              alt="icon" 
              style={{ width: '22px', height: '22px' }}
            />
          )}
        </span>
      </div>

      {/* Nav Items */}
      <ul style={{ listStyle: 'none', paddingLeft: isOpen ? '1rem' : '0', width: '100%' }}>
        <NavItem to="/dashboard" icon={<FaTachometerAlt />} text="Dashboard" isOpen={isOpen} active={location.pathname === '/dashboard'} />
        <NavItem to="/profil" icon={<FaUser />} text="Profil" isOpen={isOpen} active={location.pathname === '/profil'} />
        <NavItem to="/tentang-kami" icon={<FaAddressCard />} text="Tentang Kami" isOpen={isOpen} active={location.pathname === '/tentang-kami'} />
        <NavItem to="/pendidikan" icon={<FaGraduationCap />} text="Pendidikan" isOpen={isOpen} active={location.pathname === '/pendidikan'} />
        <NavItem to="/pengalaman" icon={<FaBriefcase />} text="Pengalaman" isOpen={isOpen} active={location.pathname === '/pengalaman'} />

        {/* Dropdown Keahlian */}
        <li>
          <div
            onClick={toggleDropdown}
            style={{
              ...linkStyle(isOpen),
              cursor: 'pointer',
              backgroundColor: location.pathname.includes('/teknis') || location.pathname.includes('/non-teknis') ? 'rgba(59, 130, 246, 0.3)' : 'transparent',
            }}
          >
            <FaTasks />
            {isOpen && (
              <span style={{ flexGrow: 1 }}>
                Keahlian
              </span>
            )}
            {isOpen && (dropdownOpen ? <FaChevronUp /> : <FaChevronDown />)}
          </div>

          <ul
            style={{
              paddingLeft: isOpen ? '20px' : '0',
              listStyle: 'none',
              overflow: 'hidden',
              transition: 'max-height 0.3s ease',
              maxHeight: dropdownOpen ? '500px' : '0',
            }}
          >
            <NavItem to="/teknis" icon={<FaTools />} text="Teknis" isOpen={isOpen} isSub active={location.pathname.includes('/teknis')} />
            <NavItem to="/non-teknis" icon={<FaUserFriends />} text="Non Teknis" isOpen={isOpen} isSub active={location.pathname.includes('/non-teknis')} />
          </ul>
        </li>
        <NavItem to="/kontak" icon={<FaEnvelope />} text="Kontak" isOpen={isOpen} active={location.pathname === '/kontak'} />
      </ul>
    </nav>
  );
}

// Komponen kecil untuk item navigasi
function NavItem({ to, icon, text, isOpen, isSub = false, active = false }) {
  return (
    <li>
      <Link
        to={to}
        style={{
          color: '#fff',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: isSub ? '8px 8px 8px 24px' : '10px',
          transition: 'background-color 0.3s',
          width: isOpen ? 'auto' : '60px',
          backgroundColor: active ? 'rgba(59, 130, 246, 0.5)' : 'transparent',
          borderRadius: '6px',
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
        onMouseLeave={(e) => e.target.style.backgroundColor = active ? 'rgba(59, 130, 246, 0.5)' : 'transparent'}
      >
        {icon}
        {isOpen && <span>{text}</span>}
      </Link>
    </li>
  );
}

// Style default
const linkStyle = (isOpen) => ({
  color: '#fff',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '10px',
  transition: 'background-color 0.3s',
  width: isOpen ? 'auto' : '60px',
  borderRadius: '6px',
});

export default SideNavbar;
