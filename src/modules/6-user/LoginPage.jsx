import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import { useAuth } from './AuthContext';
import './User.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  function handleSuccess(formData) {
    const result = loginUser(formData);
    if (result.success) {
      navigate('/');
    }
    return result;
  }

  return (
    <div className="auth-page">
      <LoginForm
        onSuccess={handleSuccess}
        onSwitchToRegister={() => navigate('/register')}
      />
      <p className="auth-preview-note">
        <Link to="/listing">Browse the menu preview</Link> without logging in.
      </p>
    </div>
  );
}
