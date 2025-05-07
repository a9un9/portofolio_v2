import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isLoggedIn, logout } from '../../utils/auth';

function TopNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    // Check if the user is logged in by looking for user data in localStorage
    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      } else {
        setUserData(null);
      }
    };

    checkUser();
    window.addEventListener('storage', checkUser); // Listen for changes in storage

    return () => {
      window.removeEventListener('storage', checkUser); // Clean up listener
    };
  }, []);

  const handleLogout = () => {
    logout(); // Clear session
    // localStorage.clear();
    localStorage.removeItem('user'); // Remove user data
    localStorage.removeItem('token'); // Remove token
    setUserData(null); // Reset user data in state
  };

  return (
    <nav style={{
      backgroundColor: '#e5e7eb',
      padding: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      width: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
    }}>
      {/* Live Link on the Left */}
      <div style={{ marginRight: 'auto' }}>
      <Link
        to="/"
        style={{
          color: '#555', // Fix the color declaration
          fontWeight: 'bold',
          textDecoration: 'none',
          padding: '10px',
          borderRadius: '5px',
          background: 'linear-gradient(135deg, #ffb3b3 0%, #80d0ff 100%)',
          transition: 'background-color 0.3s',
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        Live
      </Link>
      </div>

      <div style={{ marginRight: 'none' }}>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#555',
            fontWeight: 'bold',
            textDecoration: 'none',
            padding: '10px',
            borderRadius: '5px',
            background: 'linear-gradient(135deg, #ffb3b3 0%, #80d0ff 100%)',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          Live
        </a>
      </div>

      {/* User Profile Dropdown (if logged in) */}
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'none' }}>
        {isLoggedIn() && userData ? (
          <div
            onClick={toggleDropdown}
            style={{
              color: '#fff',
              cursor: 'pointer',
              marginLeft: '10px',
              position: 'relative',
              padding: '10px',
              borderRadius: '5px',
              background: 'linear-gradient(135deg, #ffb3b3 0%, #80d0ff 100%)'
            }}
          >
          
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '5px 10px', 
                borderRadius: '4px',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={
                    localStorage.getItem('uploadedPhoto') ||
                    userData?.foto ||
                    'https://cdn-icons-png.flaticon.com/512/149/149071.png' // Default image if no photo
                  }
                  alt="Profile"
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginRight: '10px',
                    border: '1px solid #ccc',
                  }}
                />
                <span style={{ color: 'black' }}>
                  {userData.name || userData.username}
                </span>
              </div>
            </div>

            {dropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  backgroundColor: '#333',
                  padding: '10px',
                  borderRadius: '5px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  zIndex: 10,
                  width: '150px',
                }}
              >
                <Link
                  to="/profil"
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
                  onClick={handleLogout}
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

export default TopNavbar;
