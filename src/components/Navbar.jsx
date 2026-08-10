import React from 'react';
import { Link } from 'react-router-dom';
import { useResponsive } from '../modules/7-responsive/ResponsiveWrapper';
import { useAuth } from '../modules/6-user/AuthContext';

export default function Navbar() {
  const { isMobile, menuOpen, toggleMenu, closeMenu } = useResponsive();
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          Local Food Street
        </Link>

        {isMobile && (
          <button
            className="navbar-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        )}

        <div className={`navbar-links ${isMobile ? (menuOpen ? 'open' : 'closed') : ''}`}>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/listing" onClick={closeMenu}>
            Listing
          </Link>
          <Link to="/map" onClick={closeMenu}>
            Map
          </Link>
          {isAuthenticated && (
            <Link to="/orders" onClick={closeMenu}>
              My Orders
            </Link>
          )}
          {isAuthenticated ? (
            <button
              className="navbar-logout"
              onClick={() => {
                logout();
                closeMenu();
              }}
            >
              Log out
            </button>
          ) : (
            <Link to="/login" onClick={closeMenu}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
