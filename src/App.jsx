import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import MaintenancePage from './pages/maintenance';
import AdminDashboard from './pages/admin';
import Inspector from './pages/inspector';
import Dashboard from './pages/dashboard'; // Import Dashboard component
import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [role, setRole] = useState('');

  const handleLoginSuccess = (msg, roleOrUser) => {
    setMessage(msg);
    setRole(roleOrUser);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/login" replace />} // Redirect default route to /login
          />
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path="/maintenance"
            element={role === 'electrician' || role === 'plumber' ? <MaintenancePage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/admin"
            element={role === 'AdminDashboard' ? <Admin /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/inspector"
            element={role === 'inspector' ? <Inspector /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/dashboard"
            element={role && role !== 'electrician' && role !== 'plumber' ? <Dashboard /> : <Navigate to="/login" replace />}
          />
        </Routes>
        {message && role !== "electrician" && role !== "plumber" && (
          <div>
            <h2>{message}</h2>
            <p>Welcome, {role}!</p>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
