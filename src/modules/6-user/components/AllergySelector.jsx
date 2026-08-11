import React, { useState } from "react";

const AllergySelector = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleSelect = (filter) => {
    setSelectedFilter(filter);

    if (onFilterChange) {
      onFilterChange(filter);
    }
  };

  const filters = [
    { value: "all", label: "All" },
    { value: "veg", label: "Veg", type: "veg" },
    { value: "nonveg", label: "Non-Veg", type: "nonveg" },
    { value: "South Indian", label: "South Indian" },
    { value: "North Indian", label: "North Indian" },
    { value: "Chinese", label: "Chinese" },
    { value: "Fast Food", label: "Fast Food" },
  ];

  return (
    <div style={styles.container}>
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => handleSelect(filter.value)}
          style={{
            ...styles.button,
            ...(selectedFilter === filter.value ? styles.activeButton : {}),
          }}
        >
          {filter.type === "veg" && (
            <span style={{ ...styles.foodSymbol, ...styles.vegBorder }}>
              <span style={{ ...styles.dot, ...styles.vegDot }} />
            </span>
          )}

          {filter.type === "nonveg" && (
            <span style={{ ...styles.foodSymbol, ...styles.nonVegBorder }}>
              <span style={{ ...styles.dot, ...styles.nonVegDot }} />
            </span>
          )}

          {filter.label}
        </button>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    flexWrap: "wrap",
  },

  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "7px",
    padding: "9px 16px",
    border: "1px solid #ddd",
    borderRadius: "20px",
    backgroundColor: "#fff",
    color: "#333",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "all 0.2s ease",
  },

  activeButton: {
    backgroundColor: "#ff4f64",
    color: "#fff",
    borderColor: "#ff4f64",
  },

  foodSymbol: {
    width: "15px",
    height: "15px",
    border: "2px solid",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  },

  dot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    display: "block",
  },

  vegBorder: {
    borderColor: "#16883e",
  },

  vegDot: {
    backgroundColor: "#16883e",
  },

  nonVegBorder: {
    borderColor: "#c62828",
  },

  nonVegDot: {
    backgroundColor: "#c62828",
  },
};

export default AllergySelector;
