import React, { useState } from "react";
import ExamScreen from "./components/ExamScreen";
import "./App.css";
import ConfirmationModal from "./components/modals/ConfirmationModal";
import Report from "./components/Report";
import TestSelection from "./components/TestSelection";
import { ChakraProvider } from "@chakra-ui/react";
import { testData } from "./components/data/testData";

function App() {
  const [examStarted, setExamStarted] = useState(false);
  const [selectedTest, setSelectedTest] = useState("");
  const [examStatus, setExamStatus] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
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

  const handleTerminate = (status) => {
    setExamStatus(status);
    setExamStarted(false);
  };

  const resetExam = () => {
    setExamStatus("");
    setSelectedTest("");
    setShowConfirmation(false);
  };

  const handleTestSelect = (test) => {
    setSelectedTest(test);
    setShowConfirmation(true);
  };

  return (
    <ChakraProvider>
      <div className="App">
        {!selectedTest ? (
          <TestSelection onSelectTest={handleTestSelect} />
        ) : showConfirmation ? (
          <ConfirmationModal onStart={startExam} />
        ) : examStatus === "" ? (
          <ExamScreen
            timerDuration={timerDuration}
            questions={testData[selectedTest]}
            onSubmit={handleSubmit}
            onTerminate={handleTerminate}
            enterFullScreen={enterFullScreen}
          />
        ) : (
          <Report examStatus={examStatus} onRestart={resetExam} />
        )}
      </div>
    </ChakraProvider>
  );
}

export default App;
