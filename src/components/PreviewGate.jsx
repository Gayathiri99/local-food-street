// Wraps a page (Home, Listing) so it's visible but faded/locked with a
// login/register call-to-action until the user is authenticated. Once
// logged in, renders the page normally with no overlay.

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../modules/6-user/AuthContext';

export default function PreviewGate({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return children;
  }

  return (
    <div className="locked-preview">
      {children}
      <div className="locked-preview-cta">
        <p>Log in to see the full menu and place orders</p>
        <div className="cta-buttons">
          <Link to="/login" className="cta-primary">
            Login
          </Link>
          <Link to="/register" className="cta-secondary">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
