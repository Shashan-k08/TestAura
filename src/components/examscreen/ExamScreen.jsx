import React, { useState, useEffect, useRef } from 'react';
import './ExamScreen.css';
import Timer from '../timer/Timer';
const ExamScreen = ({ timerDuration, onSubmit, onViolation, onTerminate }) => {
  const [timer, setTimer] = useState(timerDuration);
  const [violationCount, setViolationCount] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    enterFullScreen();

    if (timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      onTerminate('Time Up');
    }

    document.addEventListener('fullscreenchange', handleFullScreenExit);

    return () => {
      clearInterval(timerRef.current);
      document.removeEventListener('fullscreenchange', handleFullScreenExit);
    };
  }, [timer]);

  const handleFullScreenExit = () => {
    if (!document.fullscreenElement) {
      if (violationCount === 0) {
        onViolation('Violation Warning: You tried to exit full-screen.');
        setViolationCount(1);
      } else if (violationCount === 1) {
        onTerminate('Terminated due to multiple violations.');
      }
    }
  };

  const enterFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  };

  return (
    <div className="exam-screen">
      <h1>Exam is in Progress</h1>
      <Timer time={timer} />
      <button className="submit-btn" onClick={() => onSubmit('Submitted')}>Submit Exam</button>
    </div>
  );
};

export default ExamScreen;
