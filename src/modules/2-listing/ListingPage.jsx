// src/modules/2-listing/ListingPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSearchFilter } from './useSearchFilter';
import SearchBar from './components/SearchBar';
import PriceFilter from './components/PriceFilter';
import VendorCardList from './components/VendorCardList';
import { VENDORS, toListingCard } from '../../data/vendors';
import { useAuth } from '../6-user/AuthContext';
import './Listing.css';

// How many cards a logged-out visitor gets to see, just enough to know
// what's on offer before being asked to log in.
const PREVIEW_COUNT = 3;

// Was a hardcoded fake dataset (Tandoori Flames, Sushi Sakura, etc.) that
// didn't match the shops used in the Map and Vendor Details modules.
// Now pulls from the shared src/data/vendors.js list so clicking a card
// here leads to the same shop shown on the map.
const VENDOR_DATA = VENDORS.map(toListingCard);

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  exit: { opacity: 0 }
};

const floatAnimation = {
  y: [0, -25, 0],
  rotate: [0, 15, -15, 0],
  transition: { repeat: Infinity, duration: 5, ease: "easeInOut" }
};

const ListingPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  // If a category was picked on the Home page (e.g. "Desserts"), scope the
  // whole page to just that category before search/price filtering runs.
  const categoryVendorData = categoryParam
    ? VENDOR_DATA.filter((vendor) => vendor.category === categoryParam)
    : VENDOR_DATA;

  const {
    searchTerm,
    setSearchTerm,
    priceFilter,
    setPriceFilter,
    filteredData
  } = useSearchFilter(categoryVendorData);

  // Logged-out visitors get a fixed preview slice, not the live filtered
  // results — search/filter are for signed-in users only.
  const visibleVendors = isAuthenticated
    ? filteredData
    : categoryVendorData.slice(0, PREVIEW_COUNT);

  function handleSearchChange(value) {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setSearchTerm(value);
  }

  function handleFilterChange(value) {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setPriceFilter(value);
  }

  return (
    <motion.div 
      className="listing-page-container"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <header className="hero-header">
        <motion.div className="floating-food food-1" animate={floatAnimation}>🍔</motion.div>
        <motion.div className="floating-food food-2" animate={{...floatAnimation, transition: { ...floatAnimation.transition, delay: 1 }}}>🍣</motion.div>
        <motion.div className="floating-food food-3" animate={{...floatAnimation, transition: { ...floatAnimation.transition, delay: 2 }}}>🍕</motion.div>
        <motion.div className="floating-food food-4" animate={{...floatAnimation, transition: { ...floatAnimation.transition, delay: 0.5 }}}>🥗</motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
        >
          Local Food Street
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Discover premium culinary experiences near you.
        </motion.p>
      </header>

      {categoryParam && (
        <div className="category-scope-banner">
          <span>Showing: {categoryParam}</span>
          <button onClick={() => navigate('/listing')}>View all categories</button>
        </div>
      )}

      <section className="filters-container">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
        <PriceFilter
          currentFilter={priceFilter}
          onFilterChange={handleFilterChange}
        />
      </section>

      <main>
        <VendorCardList vendors={visibleVendors} />

        {!isAuthenticated && (
          <div className="listing-preview-note">
            <p>This is a preview of what's on Local Food Street.</p>
            <div className="listing-preview-actions">
              <button className="listing-login-btn" onClick={() => navigate('/login')}>
                Login
              </button>
              <button className="listing-register-btn" onClick={() => navigate('/register')}>
                Register
              </button>
            </div>
            <span>to see the full menu, search, and place orders</span>
          </div>
        )}
      </main>
    </motion.div>
  );
};

export default ListingPage;