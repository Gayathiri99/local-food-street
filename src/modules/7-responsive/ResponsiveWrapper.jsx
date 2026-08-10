// src/modules/7-responsive/ResponsiveWrapper.jsx
// Owned by Member 7 (Sandeep) — mobile navigation & touch handlers.
//
// Wraps the whole app, tracks the current viewport width, and exposes an
// `isMobile` flag plus a shared mobile-menu open/close state so any
// component (mainly Navbar) can react to screen size without each doing
// its own resize listener.

import React, { createContext, useContext, useEffect, useState } from 'react';

const ResponsiveContext = createContext({
  isMobile: false,
  menuOpen: false,
  toggleMenu: () => {},
  closeMenu: () => {},
});

export function useResponsive() {
  return useContext(ResponsiveContext);
}

const MOBILE_BREAKPOINT = 768;

export default function ResponsiveWrapper({ children }) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= MOBILE_BREAKPOINT : false
  );
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-close the mobile menu if the viewport grows back to desktop size.
  useEffect(() => {
    if (!isMobile) {
      setMenuOpen(false);
    }
  }, [isMobile]);

  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

  return (
    <ResponsiveContext.Provider value={{ isMobile, menuOpen, toggleMenu, closeMenu }}>
      <div className={`app-shell ${isMobile ? 'is-mobile' : 'is-desktop'}`}>
        {children}
      </div>
    </ResponsiveContext.Provider>
  );
}
