import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import WeeklyBudget from './pages/WeeklyBudget';
import MonthlyBudget from './pages/MonthlyBudget';
import './styles/dashboard.css';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Get the page title based on current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Weekly Budget';
      case '/monthly':
        return 'Monthly Budget';
      default:
        return 'Dashboard';
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-content">
          {/* Logo and Title Section */}
          <div className="logo-section">
            <img 
              src="/hflogo.png" 
              alt="Company Logo" 
              style={{
                height: '32px',
                width: 'auto',
                objectFit: 'contain'
              }}
            />
            <h1 className="brand-text">
              {getPageTitle()}
            </h1>
          </div>

          {/* Hamburger Menu */}
          <div className="hamburger-menu">
            <button
              onClick={toggleMenu}
              className="hamburger-button"
            >
              <div className="hamburger-icon">
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </div>
            </button>
          </div>
        </div>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              onClick={closeMenu}
              className={`menu-backdrop ${isMenuOpen ? 'open' : ''}`}
            />
            
            {/* Menu Items */}
            <div className={`dropdown-menu ${isMenuOpen ? 'open' : ''}`}>
              <Link 
                to="/" 
                onClick={closeMenu}
                className="nav-link"
              >
                Weekly Budget
              </Link>
              <Link 
                to="/monthly" 
                onClick={closeMenu}
                className="nav-link"
              >
                Monthly Budget
              </Link>
            </div>
          </>
        )}
      </header>
      <Routes>
        <Route path="/" element={<WeeklyBudget />} />
        <Route path="/monthly" element={<MonthlyBudget />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Navigation />
    </Router>
  );
}

export default App;
