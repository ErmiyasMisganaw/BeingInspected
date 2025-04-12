import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');

  const handleLoginSuccess = (msg, user) => {
    setMessage(msg);
    setUsername(user);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        </Routes>
      </Router>
      {message && (
        <div>
          <h2>{message}</h2>
          <p>Welcome, {username}!</p>
        </div>
      )}
    </>
  );
}

export default App;
