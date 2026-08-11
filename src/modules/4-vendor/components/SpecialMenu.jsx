import React from 'react';

export default function SpecialMenu({ special }) {
  if (!special) {
    return null;
  }

  const { name, price, ingredients = [] } = special;

  return (
    <div className="special-menu">
      <h2>Today's Special</h2>
      <div className="special-item">
        <div>
          <span className="special-name">{name}</span>
          {ingredients.length > 0 && (
            <p className="special-ingredients">
              Contains: {ingredients.join(', ')}
            </p>
          )}
        </div>
        <span className="special-price">₹{price}</span>
      </div>
    </div>
  );
}
