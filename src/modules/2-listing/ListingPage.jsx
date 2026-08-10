// src/modules/2-listing/ListingPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useSearchFilter } from './useSearchFilter';
import SearchBar from './components/SearchBar';
import PriceFilter from './components/PriceFilter';
import VendorCardList from './components/VendorCardList';
import './Listing.css';

const VENDOR_DATA = [
  {
    id: 1,
    name: "Tandoori Flames",
    category: "Indian Cuisine",
    food: "Biryani, Butter Chicken, Naan",
    rating: 4.8,
    price: "₹200-500",
    status: "open",
    description: "Authentic wood-fired tandoor specialties packed with rich spices and flavors.",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Sushi Sakura",
    category: "Japanese",
    food: "Sushi, Ramen, Bento",
    rating: 4.9,
    price: "₹500+",
    status: "busy",
    description: "Premium grade imported seafood, expertly crafted rolls, and rich broth ramen.",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "The Burger Joint",
    category: "American",
    food: "Burgers, Fries, Shakes",
    rating: 4.5,
    price: "₹0-200",
    status: "open",
    description: "Classic smashed patties, melted cheese, and loaded fries for your comfort cravings.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Mama's Pasta",
    category: "Italian",
    food: "Pasta, Pizza, Garlic Bread",
    rating: 4.7,
    price: "₹200-500",
    status: "closed",
    description: "Handmade pasta daily, secret family sauces, and wood-fired Neapolitan pizzas.",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Green Bowl Co.",
    category: "Healthy & Vegan",
    food: "Salads, Smoothie Bowls",
    rating: 4.6,
    price: "₹200-500",
    status: "open",
    description: "Fresh, organic, locally-sourced ingredients prepared for mindful eating.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "Taco Fiesta",
    category: "Mexican",
    food: "Tacos, Burritos, Nachos",
    rating: 4.4,
    price: "₹0-200",
    status: "busy",
    description: "Street-style tacos, spicy salsas, and the best guacamole in the city.",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80"
  }
];

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
  const { 
    searchTerm, 
    setSearchTerm, 
    priceFilter, 
    setPriceFilter, 
    filteredData 
  } = useSearchFilter(VENDOR_DATA);

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

      <section className="filters-container">
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />
        <PriceFilter 
          currentFilter={priceFilter} 
          onFilterChange={setPriceFilter} 
        />
      </section>

      <main>
        <VendorCardList vendors={filteredData} />
      </main>
    </motion.div>
  );
};

export default ListingPage;