import React, { useState } from "react";
import ExamScreen from "./components/examscreen/ExamScreen";
import "./App.css";
import ConfirmationModal from "./components/confirmation_modal/ConfirmationModal";
import Report from "./components/report/Report";

function App() {
  const [examStarted, setExamStarted] = useState(false);
  const [examStatus, setExamStatus] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(true);
  const timerDuration = 600;

  const startExam = () => {
    setShowConfirmation(false);
    setExamStarted(true);
  };

  const handleSubmit = (status) => {
    setExamStatus(status);
    setExamStarted(false);
  };

  const handleViolation = (message) => {
    alert(message);
  };

  const handleTerminate = (status) => {
    setExamStatus(status);
    setExamStarted(false);
  };

  const resetExam = () => {
    setExamStatus("");
    setShowConfirmation(true);
  };

  return (
    <div className="App">
      {showConfirmation ? (
        <ConfirmationModal onStart={startExam} />
      ) : examStatus === "" ? (
        <ExamScreen
          timerDuration={timerDuration}
          onSubmit={handleSubmit}
          onViolation={handleViolation}
          onTerminate={handleTerminate}
        />
      ) : (
        <Report examStatus={examStatus} onRestart={resetExam} />
      )}
    </div>
  );
}

export default App;
