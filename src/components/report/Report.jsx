import React from "react";
import "./Report.css";

const Report = ({ examStatus, onRestart }) => {
  return (
    <div className="report">
      <h1>Exam {examStatus}</h1>
      <button className="restart-btn" onClick={onRestart}>
        Restart Exam
      </button>
    </div>
  );
};

export default Report;
