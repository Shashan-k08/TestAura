import React, { useState } from "react";
import ExamScreen from "./components/examscreen/ExamScreen";
import "./App.css";
import ConfirmationModal from "./components/confirmation_modal/ConfirmationModal";
import Report from "./components/report/Report";
import { ChakraProvider } from "@chakra-ui/react";
function App() {
  // eslint-disable-next-line
  const [examStarted, setExamStarted] = useState(false);
  const [examStatus, setExamStatus] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(true);
  const timerDuration = 600;

  const startExam = () => {
    setShowConfirmation(false);
    setExamStarted(true);
    enterFullScreen();
  };

  const enterFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch((err) => {
        console.error("Full-screen request failed:", err);
        alert("Full-screen permission denied. Please check browser settings.");
      });
    } else {
      console.error("Full-screen mode is not supported by this browser.");
    }
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
    <>
      <ChakraProvider>
        <div className="App">
          {showConfirmation ? (
            <ConfirmationModal onStart={startExam} />
          ) : examStatus === "" ? (
            <ExamScreen
              timerDuration={timerDuration}
              onSubmit={handleSubmit}
              onViolation={handleViolation}
              onTerminate={handleTerminate}
              enterFullScreen={enterFullScreen}
            />
          ) : (
            <Report examStatus={examStatus} onRestart={resetExam} />
          )}
        </div>
      </ChakraProvider>
    </>
  );
}

export default App;
