import React from "react";
import "./ConfirmationModal.css";

const ConfirmationModal = ({ onStart }) => {
  return (
    <div className="modal">
      <h1>Ready to Start the Exam?</h1>
      <button className="start-btn" onClick={onStart}>
        Start Exam
      </button>
    </div>
  );
};

export default ConfirmationModal;
