// src/context/FeedbackContext.jsx
//
// Stores shop feedback (star rating + comment) collected via FeedbackModal,
// which pops up automatically after a customer's 2nd order. Persisted to
// localStorage the same way Auth/Orders are — no backend exists yet.

import React, { createContext, useContext, useEffect, useState } from 'react';

const FeedbackContext = createContext({
  feedbackEntries: [],
  addFeedback: () => {},
});

export function useFeedback() {
  return useContext(FeedbackContext);
}

export default function FeedbackProvider({ children }) {
  const [feedbackEntries, setFeedbackEntries] = useState(() => {
    const stored = localStorage.getItem('lfs_feedback');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('lfs_feedback', JSON.stringify(feedbackEntries));
  }, [feedbackEntries]);

  function addFeedback(entry) {
    const newEntry = {
      id: `feedback-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      ...entry,
    };
    setFeedbackEntries((current) => [newEntry, ...current]);
  }

  return (
    <FeedbackContext.Provider value={{ feedbackEntries, addFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
}
