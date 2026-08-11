import React, { useState } from "react";
import "../Reviews.css";

const HygieneModal = ({ isOpen, onClose }) => {
  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Hygiene report submitted successfully!");

    setIssue("");
    setDescription("");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Report Hygiene Issue</h2>

        <form onSubmit={handleSubmit}>
          <label>Select Issue</label>

          <select
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            required
          >
            <option value="">-- Select an Issue --</option>
            <option value="Dirty Utensils">Dirty Utensils</option>
            <option value="Unclean Cooking Area">
              Unclean Cooking Area
            </option>
            <option value="Poor Waste Management">
              Poor Waste Management
            </option>
            <option value="Unsafe Drinking Water">
              Unsafe Drinking Water
            </option>
            <option value="Other">Other</option>
          </select>

          <label>Description</label>

          <textarea
            rows="4"
            placeholder="Describe the issue..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          <div className="modal-buttons">
            <button type="submit" className="submit-btn">
              Submit
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HygieneModal;