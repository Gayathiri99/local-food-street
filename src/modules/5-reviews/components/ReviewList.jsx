import React from "react";
import "../Reviews.css";

const ReviewList = ({ reviews }) => {
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((total, review) => total + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="review-container">
      <div className="review-header">
        <h2>Customer Reviews</h2>

        <div className="review-summary">
          <span className="rating">
            ⭐ {averageRating} / 5
          </span>
          <span className="review-count">
            {reviews.length} Reviews
          </span>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="no-reviews">
          <p>No reviews available.</p>
        </div>
      ) : (
        reviews.map((review) => (
          <div className="review-card" key={review.id}>
            <div className="review-top">
              <h3>{review.name}</h3>
              <span>{review.date}</span>
            </div>

            <div className="stars">
              {"⭐".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </div>

            <p>{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;