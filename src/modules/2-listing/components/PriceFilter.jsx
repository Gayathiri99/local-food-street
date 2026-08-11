// src/modules/2-listing/components/PriceFilter.jsx
import React from 'react';

const PriceFilter = ({ currentFilter, onFilterChange }) => {
  const options = ['All', '₹0-200', '₹200-500', '₹500+'];

  return (
    <div className="price-filter-container">
      {options.map((option) => (
        <button
          key={option}
          className={`filter-chip ${currentFilter === option ? 'active' : ''}`}
          onClick={() => onFilterChange(option)}
          aria-label={`Filter by price: ${option}`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default PriceFilter;