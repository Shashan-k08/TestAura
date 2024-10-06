import React, { useState, useEffect, useRef } from "react";
import Timer from "../timer/Timer";
import WarningModal from "../modals/WarningModal"; // Import the new WarningModal component
import "./ExamScreen.css";

const ExamScreen = ({
  timerDuration,
  onSubmit,
  onViolation,
  onTerminate,
  enterFullScreen,
}) => {
  const [timer, setTimer] = useState(timerDuration);
  const [violationCount, setViolationCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const timerRef = useRef(null);

  useEffect(() => {
    if (timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      onTerminate("Time Up");
    }

    document.addEventListener("fullscreenchange", handleFullScreenExit);

    return () => {
      clearInterval(timerRef.current);
      document.removeEventListener("fullscreenchange", handleFullScreenExit);
    };
    // eslint-disable-next-line
  }, [timer]);

  const handleFullScreenExit = () => {
    if (!document.fullscreenElement) {
      if (violationCount === 0) {
        // onViolation("Violation Warning: You tried to exit full-screen.");
        setIsModalOpen(true);
        setViolationCount(1);
      } else if (violationCount === 1) {
        onTerminate("Terminated due to multiple violations.");
      }
    }
  };

  const handleReEnterFullScreen = () => {
    enterFullScreen();
    setIsModalOpen(false);
  };

  return (
    <div className="exam-screen">
      <h1>Exam is in Progress</h1>
      <Timer time={timer} />
      <button className="submit-btn" onClick={() => onSubmit("Submitted")}>
        Submit Exam
      </button>

      <WarningModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReEnterFullScreen={handleReEnterFullScreen}
      />
    </div>
  );
};

export default ExamScreen;
