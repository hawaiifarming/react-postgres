import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import WeeklyBudget from './pages/WeeklyBudget';
import MonthlyBudget from './pages/MonthlyBudget';
import './styles/dashboard.css';

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Get page title based on current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Weekly Budget';
      case '/monthly':
        return 'Monthly Budget';
      default:
        return 'Sales Dashboard';
    }
  };

  return (
    <>
      {/* Sticky Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: '#059669',
        borderBottom: '1px solid #e5e7eb',
        padding: '1rem 2rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Logo and Title */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '50%',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img 
                src="/hflogo.png" 
                alt="Logo" 
                style={{
                  height: '32px',
                  width: 'auto'
                }}
              />
            </div>
            <h1 style={{
              color: 'white',
              margin: 0,
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              {getPageTitle()}
            </h1>
          </div>

          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
          >
            <div style={{
              width: '24px',
              height: '2px',
              backgroundColor: 'white',
              margin: '4px 0',
              transition: '0.3s'
            }}></div>
            <div style={{
              width: '24px',
              height: '2px',
              backgroundColor: 'white',
              margin: '4px 0',
              transition: '0.3s'
            }}></div>
            <div style={{
              width: '24px',
              height: '2px',
              backgroundColor: 'white',
              margin: '4px 0',
              transition: '0.3s'
            }}></div>
          </button>
        </div>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            right: '2rem',
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '0.375rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            minWidth: '200px',
            zIndex: 1001
          }}>
            <Link
              to="/"
              onClick={closeMenu}
              style={{
                display: 'block',
                padding: '0.75rem 1rem',
                color: '#374151',
                textDecoration: 'none',
                borderBottom: '1px solid #f3f4f6'
              }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#f9fafb'}
              onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}
            >
              Weekly Budget
            </Link>
            <Link
              to="/monthly"
              onClick={closeMenu}
              style={{
                display: 'block',
                padding: '0.75rem 1rem',
                color: '#374151',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#f9fafb'}
              onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}
            >
              Monthly Budget
            </Link>
          </div>
        )}
      </header>

      {/* Menu Backdrop */}
      {isMenuOpen && (
        <div
          onClick={closeMenu}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
        />
      )}

      {/* Main Content with top padding to account for fixed header */}
      <main style={{ paddingTop: '80px' }}>
        <Routes>
          <Route path="/" element={<WeeklyBudget />} />
          <Route path="/monthly" element={<MonthlyBudget />} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App
