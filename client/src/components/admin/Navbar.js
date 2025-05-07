import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isLoggedIn, logout } from '../../utils/auth';
import { FaUser } from 'react-icons/fa';

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav style={{ background: 'transparent', padding: '10px 20px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
      {/* Bagian kiri navbar */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {isLoggedIn() ? (
          <>
            <div
              onClick={toggleDropdown}
              style={{
                color: '#fff',
                cursor: 'pointer',
                marginLeft: '10px',
                position: 'relative',
                padding: '10px',
                borderRadius: '5px',
                background: 'rgba(255, 255, 255, 0.1)', // Background agar clickable
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FaUser style={{ marginRight: '8px', color: 'black' }} /> {/* Icon User */}
                <span
                  style={{
                    color: 'black',
                    padding: '5px 10px',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Setting
                </span>
              </div>

              {dropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,  // Mengubah dari right ke left
                    backgroundColor: '#333',
                    padding: '10px',
                    borderRadius: '5px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    zIndex: 10,
                    width: '150px',
                    opacity: dropdownOpen ? 1 : 0,
                    visibility: dropdownOpen ? 'visible' : 'hidden',
                    transition: 'opacity 0.3s ease, visibility 0s 0.3s',
                  }}
                >
                  <Link
                    to="/settings/profile"
                    style={{
                      color: '#fff',
                      textDecoration: 'none',
                      display: 'block',
                      padding: '5px 10px',
                      marginBottom: '5px',
                      borderRadius: '5px',
                      transition: 'background-color 0.3s',
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    Profil
                  </Link>
                  <button
                    onClick={logout}
                    style={{
                      color: '#fff',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '5px 10px',
                      marginBottom: '5px',
                      width: '100%',
                      textAlign: 'left',
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: '#fff', marginLeft: '10px' }}>Login</Link>
            <Link to="/register" style={{ color: '#fff', marginLeft: '10px' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
