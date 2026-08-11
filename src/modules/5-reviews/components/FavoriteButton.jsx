import React, { useEffect, useState } from "react";
import "../Reviews.css";

const FavoriteButton = ({ vendorId }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites =
      JSON.parse(localStorage.getItem("favoriteVendors")) || [];

    setIsFavorite(favorites.includes(vendorId));
  }, [vendorId]);

  const toggleFavorite = () => {
    let favorites =
      JSON.parse(localStorage.getItem("favoriteVendors")) || [];

    if (favorites.includes(vendorId)) {
      favorites = favorites.filter((id) => id !== vendorId);
      setIsFavorite(false);
    } else {
      favorites.push(vendorId);
      setIsFavorite(true);
    }

    localStorage.setItem(
      "favoriteVendors",
      JSON.stringify(favorites)
    );
  };

  return (
    <button
      className={`favorite-btn ${isFavorite ? "active" : ""}`}
      onClick={toggleFavorite}
    >
      {isFavorite ? "❤️ Remove Favorite" : "🤍 Add to Favorites"}
    </button>
  );
};

export default FavoriteButton;