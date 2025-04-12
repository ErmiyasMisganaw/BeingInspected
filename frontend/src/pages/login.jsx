import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    let isAuthenticated = false;

    // Simulated user data
    const users = {
      admin: { username: "admin@example.com", password: "admin123", role: "admin" },
      inspector: { username: "inspector@example.com", password: "inspector123", role: "inspector" },
      electrician: { username: "electrician@example.com", password: "electrician123", role: "electrician" },
      plumber: { username: "plumber@example.com", password: "plumber123", role: "plumber" },
    };

    for (let key in users) {
      if (users[key].username === email && users[key].password === password) {
        isAuthenticated = true;
        const role = users[key].role;

        onLoginSuccess(`Login successful!`, role);

        // Role-based redirection
        if (role === "inspector") {
          navigate('/dashboard');
        } else if (role === "admin") {
          navigate('/admin');
        } else if (role === "electrician" || role === "plumber") {
          navigate('/maintenance');
        }
        break;
      }
    }

    if (!isAuthenticated) {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-text">
        <h1>Login</h1>
      </div>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              id="email"
              className="rounded-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="rounded-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        {/* Display user credentials for testing */}
        <div className="test-credentials">
          <h3>Test Credentials:</h3>
          <ul>
            <li>Admin: admin@example.com / admin123</li>
            <li>Inspector: inspector@example.com / inspector123</li>
            <li>Electrician: electrician@example.com / electrician123</li>
            <li>Plumber: plumber@example.com / plumber123</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
