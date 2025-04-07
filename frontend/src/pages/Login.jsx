// client/src/pages/Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3002/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.token) {
        setMessage('Login successful');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Login failed');
    }
  };

  return (
    <div className="login-bg">
      <div className="login-content-row">
        {/* LEFT SECTION: Info with semi-transparent overlay */}
        <div className="info-section">
          <div className="info-overlay">
            <h1>Welcome to PaletteSquare</h1>
            <p>
              Your interactive art marketplace. Discover unique artworks, 
              connect with talented artists, and bring creativity into your life.
            </p>
          </div>
        </div>

        {/* RIGHT SECTION: The login card */}
        <div className="login-container">
          <div className="card login-card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              {message && <div className="alert alert-info">{message}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control custom-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control custom-input"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 custom-btn">Login</button>
              </form>
              <div className="mt-4 text-center">
                <p>
                  Don't have an account? <Link to="/register" className="custom-link">Sign up here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
