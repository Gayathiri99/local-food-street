import React, { useState } from 'react';

const RegisterForm = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [selectedCuisine, setSelectedCuisine] = useState('🍕 Pizza');
  const [loading, setLoading] = useState(false);

  const cuisines = ['🍕 Pizza', '🍔 Burger', '🍣 Sushi', '🥗 Healthy', '🌮 Tacos'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert(`Account created for ${formData.fullName}! Preferred Cuisine: ${selectedCuisine}`);
    }, 1200);
  };

  return (
    <div className="auth-form-wrapper fade-in">
      <div className="form-header">
        <h3>Join Foodify 🍕</h3>
        <p>Create an account to unlock tasty deals</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="fullName"
            placeholder=" "
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <label>Full Name</label>
        </div>

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

        <div className="cuisine-preference">
          <label>Favorite Craving?</label>
          <div className="cuisine-chips">
            {cuisines.map((item) => (
              <span
                key={item}
                className={`chip ${selectedCuisine === item ? 'active' : ''}`}
                onClick={() => setSelectedCuisine(item)}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? 'Creating Account...' : 'Get Started 🍕'}
        </button>
      </form>

      <p className="toggle-text">
        Already have an account?
        <span className="toggle-link" onClick={onSwitchToLogin}>
          Sign In
        </span>
      </p>
    </div>
  );
};

export default RegisterForm;