import React, { useState } from 'react';

let users = {
  user1: { username: "username", password: "password", role: "admin" },
  user2: { username: "username2", password: "password2", role: "inspector" },
  user3: { username: "username3", password: "password3", role: "electrician" },
  user4: { username: "username4", password: "password4", role: "plumber" }
};

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let isAuthenticated = false;

    for (let key in users) {
      if (users[key].username === email && users[key].password === password) {
        isAuthenticated = true;
        onLoginSuccess(`Login successful!`, users[key].username);
        break;
      }
    }

    if (!isAuthenticated) {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            id="email"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
