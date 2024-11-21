
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import axios from 'axios';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Validate inputs
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
  
    try {
      // Call backend API
      const response = await axios.post('http://localhost:5000/api/auth/login/user', {
        email: username,
        password,
      });
  
      // Store the token in local storage
      localStorage.setItem('token', response.data.token);
  
      // Navigate to home page on success
      setError('');
      navigate('/home');
    } catch (err: any) {
      // Handle errors from the backend
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    }
  };
  


  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            id="username"
            className="form-input"
            placeholder="Enter your email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            className="form-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {/* Login button */}
        <button type="submit" className="login-button">Login</button>
      </form>
      {/* Signup link */}
      <div className="signup-link">
        <p>Don't have an account? <a href="/signup" className="signup-link-text">Sign up</a></p>
      </div>
    </div>
  );
};

export default Login;










