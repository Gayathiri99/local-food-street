import React from "react";
import "../Reviews.css";

const CrowdStatusMeter = ({ crowdLevel = "Medium" }) => {
  let percentage = 50;
  let waitingTime = "10 - 20 mins";
  let statusClass = "medium";

  if (crowdLevel === "Low") {
    percentage = 25;
    waitingTime = "5 - 10 mins";
    statusClass = "low";
  } else if (crowdLevel === "High") {
    percentage = 90;
    waitingTime = "20 - 40 mins";
    statusClass = "high";
  }

  return (
    <div className="crowd-status">
      <h3>Live Crowd Status</h3>

      <p>
        Current Crowd:
        <span className={`status ${statusClass}`}>
          {" "}
          {crowdLevel}
        </span>
      </p>

      <div className="progress-bar">
        <div
          className={`progress ${statusClass}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <p>Estimated Waiting Time: {waitingTime}</p>
    </div>
  );
};

export default CrowdStatusMeter;