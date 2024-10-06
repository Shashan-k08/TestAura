import React, { useState } from "react";
import { ChakraProvider, Container } from "@chakra-ui/react";
import ExamScreen from "./components/ExamScreen";
import TestSelection from "./components/TestSelection";
import QuestionScreen from "./components/QuestionScreen";
import WarningModal from "./components/modals/WarningModal";
import { testData } from "./data";

function App() {
  const [examStarted, setExamStarted] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [examStatus, setExamStatus] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const timerDuration = 600;

  const startExam = () => {
    setExamStarted(true);
  };

  const enterFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch((err) => {
        setWarningMessage(
          "Full-screen permission denied. Please check browser settings."
        );
        setShowWarning(true);
      });
    } else {
      setWarningMessage("Full-screen mode is not supported by this browser.");
      setShowWarning(true);
    }
  };

  const handleTestSelection = (test) => {
    setSelectedTest(test);
  };

  const handleSubmit = (status) => {
    setExamStatus(status);
    setExamStarted(false);
  };

  const resetExam = () => {
    setExamStatus("");
    setSelectedTest(null);
  };

  return (
    <ChakraProvider>
      <Container maxW="container.md">
        {!selectedTest ? (
          <TestSelection onSelectTest={handleTestSelection} />
        ) : !examStarted ? (
          <ExamScreen
            timerDuration={timerDuration}
            onSubmit={handleSubmit}
            enterFullScreen={enterFullScreen}
          />
        ) : (
          <QuestionScreen
            questions={testData[selectedTest]}
            onSubmit={handleSubmit}
          />
        )}

        <WarningModal
          isOpen={showWarning}
          onClose={() => setShowWarning(false)}
          message={warningMessage}
        />
      </Container>
    </ChakraProvider>
  );
}

export default App;
