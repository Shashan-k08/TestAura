import React from "react";
import "./Timer.css";

const Timer = ({ time }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="timer">
      <p>Time Remaining: {formatTime(time)}</p>
    </div>
  );
};

export default Timer;
