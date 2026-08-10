// src/modules/2-listing/components/VendorCardList.jsx
import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring', stiffness: 90, damping: 15 }
  }
};

const VendorCardList = ({ vendors }) => {
  if (vendors.length === 0) {
    return (
      <motion.div 
        className="no-results"
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
      >
        <h3>No food spots found </h3>
        <p>Try adjusting your search or price filters.</p>
      </motion.div>
    );
  }

  const renderStatusBadge = (status) => {
    switch(status) {
      case 'open':
        return <div className="status-badge open"> Open Now</div>;
      case 'busy':
        return <div className="status-badge busy"> Busy</div>;
      case 'closed':
        return <div className="status-badge closed"> Closed</div>;
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className="vendor-grid"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {vendors.map((vendor) => (
        <motion.div 
          key={vendor.id} 
          className="vendor-card"
          variants={itemVariants}
        >
          <div className="card-image-container">
            {renderStatusBadge(vendor.status)}
            
            <button className="favorite-btn" aria-label="Add to favorites">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 
19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
            
            <img 
              src={vendor.image} 
              alt={vendor.name} 
              className="card-image"
              loading="lazy"
            />
          </div>
          <div className="card-content">
            <div className="card-header">
              <h3 className="card-title">{vendor.name}</h3>
              <span className="card-rating">
                ★ {vendor.rating}
              </span>
            </div>
            
            <div className="card-meta">
              <span>{vendor.category}</span>
              <span>•</span>
              <span>{vendor.price}</span>
            </div>
            
            <p className="card-desc">{vendor.description}</p>
            
            <button className="view-btn">
              <span>View Details</span>
            </button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default VendorCardList;