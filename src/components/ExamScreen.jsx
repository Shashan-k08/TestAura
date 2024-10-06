import React, { useEffect, useRef, useState } from "react";
import { Box, Heading, Button, Text } from "@chakra-ui/react";
import Timer from "./Timer";

const ExamScreen = ({
  timerDuration,
  onSubmit,
  onTerminate,
  enterFullScreen,
}) => {
  const [timer, setTimer] = useState(timerDuration);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      onTerminate("Time Up");
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [timer]);

  return (
    <Box textAlign="center" p={10}>
      <Heading mb={6} color="teal.500">
        Exam in Progress
      </Heading>
      <Timer time={timer} />
      <Button
        colorScheme="red"
        size="lg"
        mt={6}
        onClick={() => onSubmit("Submitted")}
      >
        Submit Exam
      </Button>
    </Box>
  );
};

export default ExamScreen;
