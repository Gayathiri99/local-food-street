import React from 'react';

export default function StarRating({ value = 0, onChange, readOnly = false, size = 22 }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="star-rating" role={readOnly ? undefined : 'radiogroup'} aria-label="Rating">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          className="star-rating-btn"
          aria-label={`${star} star${star > 1 ? 's' : ''}`}
          aria-pressed={star <= value}
          disabled={readOnly}
          onClick={() => onChange?.(star)}
          style={{ fontSize: size }}
        >
          {star <= value ? '★' : '☆'}
        </button>
      ))}
    </div>
  );
}
