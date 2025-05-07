import React from 'react';

const Header = ({ isMenuOpen, toggleMenu, activeSection }) => {
  return (
    <header className="header">
      <nav className="navbar">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', lineHeight: '1.2' }}>
          <span style={{ fontSize: '28px' }}>Portofolio</span>
          <span style={{ fontSize: '10px', textTransform: 'capitalize' }}>Agung Hutri Saputra H</span>
        </div>

        {/* Menu Toggle Button */}
        <button className="menu-toggle" onClick={toggleMenu}>
          &#9776; {/* Hamburger icon */}
        </button>

        {/* Navbar Links */}
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="#home" className={activeSection === 'home' ? 'active' : ''}>Home</a></li>
          <li><a href="#about" className={activeSection === 'about' ? 'active' : ''}>About Me</a></li>
          {/* <li><a href="#education" className={activeSection === 'education' ? 'active' : ''}>Education</a></li> */}
          <li><a href="#experience" className={activeSection === 'experience' ? 'active' : ''}>Experience</a></li>
          <li><a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>Projects</a></li>
          <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
