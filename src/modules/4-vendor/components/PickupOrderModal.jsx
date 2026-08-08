// PickupOrderModal.jsx
// Req #13: Lets a customer place an express pickup order when the stall is crowded.

import React, { useState } from 'react';

export default function PickupOrderModal({ isOpen, onClose, onSubmit }) {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) {
    return null;
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit?.({ item, quantity });
    onClose?.();
  }

  return (
    <div className="pickup-modal-overlay" onClick={onClose}>
      <div className="pickup-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Express Pickup Order</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Item
            <input
              type="text"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              required
            />
          </label>
          <label>
            Quantity
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
            />
          </label>
          <button type="submit" className="pickup-modal-trigger">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}
