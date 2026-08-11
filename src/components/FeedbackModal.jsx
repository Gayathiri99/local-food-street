// Pops up automatically after a customer's 2nd order (wired from
// VendorDetailsPage), asking how their experience was with the shop they
// just ordered from.

import React, { useState } from 'react';
import StarRating from './StarRating';
import { useFeedback } from '../context/FeedbackContext';

export default function FeedbackModal({ vendor, onClose }) {
  const { addFeedback } = useFeedback();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!vendor) {
    return null;
  }

  function handleSubmit(e) {
    e.preventDefault();
    addFeedback({
      vendorId: vendor.id,
      vendorName: vendor.name,
      rating,
      comment,
    });
    setSubmitted(true);
  }

  return (
    <div className="feedback-modal-overlay" onClick={onClose}>
      <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
        {submitted ? (
          <div className="feedback-thanks">
            <div className="pickup-confirmation-icon">🙏</div>
            <h2>Thanks for your feedback!</h2>
            <button className="pickup-modal-trigger" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <h2>How was your experience?</h2>
            <p className="feedback-subtitle">
              You've placed a couple of orders — tell us how {vendor.name} was.
            </p>
            <form onSubmit={handleSubmit}>
              <StarRating value={rating} onChange={setRating} size={30} />
              <label className="feedback-comment-label">
                Comments (optional)
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  placeholder="What did you like or dislike?"
                />
              </label>
              <div className="feedback-actions">
                <button type="submit" className="pickup-modal-trigger" disabled={rating === 0}>
                  Submit Feedback
                </button>
                <button type="button" className="payment-cancel" onClick={onClose}>
                  Skip
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
