import { useEffect, useState } from "react";

const STORAGE_KEY = "street_food_reviews";

const useReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const savedReviews = localStorage.getItem(STORAGE_KEY);

    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    } else {
      const defaultReviews = [
        {
          id: 1,
          name: "Mayuri",
          rating: 5,
          comment: "Excellent food and clean place.",
          date: "05 Aug 2026",
        },
        {
          id: 2,
          name: "Rahul",
          rating: 4,
          comment: "Affordable and tasty. Service was quick.",
          date: "04 Aug 2026",
        },
      ];

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(defaultReviews)
      );

      setReviews(defaultReviews);
    }
  }, []);

  const addReview = (review) => {
    const updatedReviews = [...reviews, review];

    setReviews(updatedReviews);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedReviews)
    );
  };

  const deleteReview = (id) => {
    const updatedReviews = reviews.filter(
      (review) => review.id !== id
    );

    setReviews(updatedReviews);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedReviews)
    );
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (total, review) => total + review.rating,
            0
          ) / reviews.length
        ).toFixed(1)
      : "0.0";

  return {
    reviews,
    addReview,
    deleteReview,
    averageRating,
  };
};

export default useReviews;