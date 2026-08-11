import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useResponsive } from '../modules/7-responsive/ResponsiveWrapper';
import { useAuth } from '../modules/6-user/AuthContext';

export default function Navbar() {
  const { isMobile, menuOpen, toggleMenu, closeMenu } = useResponsive();
  const { isAuthenticated, user, logout } = useAuth();

  // LoginPage only collects an email, RegisterPage collects a name too — so
  // fall back to the part of the email before the @ when there's no name.
  const displayName = user?.name || user?.email?.split('@')[0] || 'Account';

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
            <div className="navbar-account">
              <span className="navbar-username">{displayName}</span>
              <button
                className="navbar-logout-icon"
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                aria-label="Log out"
                title="Log out"
              >
                <LogOut size={18} />
              </button>
            </div>
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
