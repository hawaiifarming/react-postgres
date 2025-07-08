import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleNavClick = () => {
    closeMenu();
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      {menuOpen && <div className="menu-backdrop open" onClick={closeMenu}></div>}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M9.5 3C8.67 3 8 3.67 8 4.5V5H6.5C5.67 5 5 5.67 5 6.5S5.67 8 6.5 8H8V16.5C8 17.33 8.67 18 9.5 18S11 17.33 11 16.5V8H12.5C13.33 8 14 7.33 14 6.5S13.33 5 12.5 5H11V4.5C11 3.67 10.33 3 9.5 3ZM16.5 9C15.67 9 15 9.67 15 10.5V11H13.5C12.67 11 12 11.67 12 12.5S12.67 14 13.5 14H15V18.5C15 19.33 15.67 20 16.5 20S18 19.33 18 18.5V14H19.5C20.33 14 21 13.33 21 12.5S20.33 11 19.5 11H18V10.5C18 9.67 17.33 9 16.5 9Z"/>
              </svg>
            </div>
            <span className="brand-text">Dashboard</span>
          </div>
          <div className="hamburger-menu" ref={menuRef}>
            <button 
              className="hamburger-button" 
              onClick={toggleMenu} 
              aria-label="Menu"
            >
              <svg className="hamburger-icon" viewBox="0 0 24 24">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
              </svg>
            </button>
            <nav className={`dropdown-menu ${menuOpen ? 'open' : ''}`}>
              <a href="#" className="nav-link" onClick={handleNavClick}>Daily Summary</a>
              <Link to="/" className="nav-link" onClick={closeMenu}>Weekly Budget</Link>
              <Link to="/monthly" className="nav-link" onClick={closeMenu}>Monthly Budget</Link>
              <a href="#" className="nav-link" onClick={handleNavClick}>Customer Summary</a>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
