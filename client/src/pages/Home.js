import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../assets/css/style2.css';
import Header from './Header';
import About from './About';
import Project from './Project';
import Experience from './Experience';
import Contact from './Contact';
import TypingEffect from './TypingEffect'; // Import TypingEffect

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [userData, setDataUser] = useState(null); // State for storing user data

  // Toggle menu for mobile view
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle scroll to highlight active section
  const handleScroll = () => {
    const sections = ['home', 'about', 'education', 'experience', 'projects', 'contact'];
    const scrollPosition = window.scrollY + 150;

    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      }
    });
  };

  // Fetch user data from API
  useEffect(() => {
    Axios.get('http://localhost:5000/api/auth/user/client')
    .then((response) => {
      console.log('API Response:', response.data);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setDataUser(response.data[0]); // Ambil data pertama dari array
      }
    })
    .catch((error) => {
      console.error('Error fetching portfolio data', error);
    });

    // Listen for scroll events to highlight active section
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-container">
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} activeSection={activeSection} />

      {/* Portfolio Header Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          {userData ? (
            <>
              <h1>{userData?.name || 'Loading...'}</h1> {/* Display loading message if name is not available */}
              {/* Only render TypingEffect if deskripsi is available */}
              {userData?.deskripsi ? (
                <TypingEffect text={userData.deskripsi} />
              ) : (
                <p>Loading typing effect...</p>
              )}
              <a href="#about" className="cta-button">More . . .</a>
            </>
          ) : (
            <p>Loading...</p> // Show loading message if userData is not available
          )}
        </div>
      </section>

      {/* Other sections */}
      <About />
      <Experience />
      <Project />
      <Contact />

      <footer className="footer">
        <p>&copy; 2025 My Portfolio</p>
      </footer>
    </div>
  );
};

export default Home;
