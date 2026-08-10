import React, { useState } from 'react';

const LoginForm = ({ onSwitchToRegister }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      alert(`Welcome back to Foodify! Logged in as ${formData.email}`);
    }, 1200);
  };

  return (
    <div className="auth-form-wrapper fade-in">
      <div className="form-header">
        <h3>Welcome Back! 🍔</h3>
        <p>Login to order your favorite cravings</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder=" "
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Email Address</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder=" "
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label>Password</label>
        </div>

        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? 'Authenticating...' : 'Sign In 🚀'}
        </button>
      </form>

      <p className="toggle-text">
        Don't have an account?
        <span className="toggle-link" onClick={onSwitchToRegister}>
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default LoginForm;