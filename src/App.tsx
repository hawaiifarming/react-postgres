import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WeeklyBudget from './pages/WeeklyBudget';
import MonthlyBudget from './pages/MonthlyBudget';
import './styles/dashboard.css';

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', backgroundColor: '#f0f9ff', borderBottom: '1px solid #e0e7ff' }}>
        <Link to="/" style={{ marginRight: '1rem', textDecoration: 'none', color: '#059669', fontWeight: 'bold' }}>
          Weekly Budget
        </Link>
        <Link to="/monthly" style={{ textDecoration: 'none', color: '#059669', fontWeight: 'bold' }}>
          Monthly Budget
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<WeeklyBudget />} />
        <Route path="/monthly" element={<MonthlyBudget />} />
      </Routes>
    </Router>
  );
}

export default App
