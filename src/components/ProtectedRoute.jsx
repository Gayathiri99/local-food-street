// Fully blocks a route until logged in — used for pages further "inside"
// the app (like ordering from a vendor) rather than the Home/Listing
// preview, which stays partially visible via PreviewGate instead.

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../modules/6-user/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
