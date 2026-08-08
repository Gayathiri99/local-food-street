import React from 'react';

export default function SpecialMenu({ special }) {
  if (!special) {
    return null;
  }

  const { name, price } = special;

  return (
    <div className="special-menu">
      <h2>Today's Special</h2>
      <div className="special-item">
        <span>{name}</span>
        <span>₹{price}</span>
      </div>
    </div>
  );
}
