// src/modules/6-user/AuthContext.jsx
//
// Minimal auth state for gating the app — no real backend exists yet, so
// this just tracks "is someone logged in" in memory (persisted to
// localStorage so a page refresh doesn't log you back out). LoginForm and
// RegisterForm still just fake a network delay and call onSuccess; this is
// what actually flips the app into its unlocked state after that.
//
// registerUser/loginUser add a second layer on top of that: a list of
// "accounts that have actually registered" (lfs_registered_users), so
// logging in with an email that never registered is rejected instead of
// silently letting anyone in.

import React, { createContext, useContext, useEffect, useState } from 'react';

const REGISTERED_USERS_KEY = 'lfs_registered_users';

function getRegisteredUsers() {
  const stored = localStorage.getItem(REGISTERED_USERS_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveRegisteredUsers(users) {
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
}

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  registerUser: () => ({ success: false }),
  loginUser: () => ({ success: false }),
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

  // Saves a new account to the registered-users list, then signs them in.
  function registerUser({ email, password, fullName }) {
    const users = getRegisteredUsers();
    const alreadyExists = users.some(
      (existing) => existing.email.toLowerCase() === email.toLowerCase()
    );

    if (alreadyExists) {
      return { success: false, error: 'An account with this email already exists. Try logging in instead.' };
    }

    saveRegisteredUsers([...users, { email, password, name: fullName }]);
    setUser({ email, name: fullName });
    return { success: true };
  }

  // Only signs someone in if their email is in the registered-users list
  // and the password matches what they registered with.
  function loginUser({ email, password }) {
    const users = getRegisteredUsers();
    const match = users.find(
      (existing) => existing.email.toLowerCase() === email.toLowerCase()
    );

    if (!match) {
      return { success: false, error: "No account found for this email. Please register first." };
    }

    if (match.password !== password) {
      return { success: false, error: 'Incorrect password.' };
    }

    setUser({ email: match.email, name: match.name });
    return { success: true };
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, logout, registerUser, loginUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
