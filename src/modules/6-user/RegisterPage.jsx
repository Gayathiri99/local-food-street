import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import { useAuth } from './AuthContext';
import './User.css';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  function handleSuccess(formData) {
    login({ email: formData.email, name: formData.fullName });
    navigate('/');
  }

  return (
    <div className="auth-page">
      <RegisterForm
        onSuccess={handleSuccess}
        onSwitchToLogin={() => navigate('/login')}
      />
      <p className="auth-preview-note">
        <Link to="/listing">Browse the menu preview</Link> without registering.
      </p>
    </div>
  );
}
