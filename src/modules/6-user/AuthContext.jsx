// src/modules/6-user/AuthContext.jsx
//
// Minimal auth state for gating the app — no real backend exists yet, so
// this just tracks "is someone logged in" in memory (persisted to
// localStorage so a page refresh doesn't log you back out). LoginForm and
// RegisterForm still just fake a network delay and call onSuccess; this is
// what actually flips the app into its unlocked state after that.

import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('lfs_user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('lfs_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('lfs_user');
    }
  }, [user]);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
