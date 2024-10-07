import React, { useState } from "react";
import { Box, Button, Radio, RadioGroup, Stack, Text, Heading, VStack } from "@chakra-ui/react";

const QuestionScreen = ({ questions, onSubmit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption("");
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption("");
    }
  };

  const handleSubmit = () => {
    onSubmit("Submitted");
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Box p={8}>
      <Heading as="h2" size="lg" mb={6} color="teal.500">{`Question ${currentQuestionIndex + 1}`}</Heading>
      <Text fontSize="xl" mb={4}>{currentQuestion.question}</Text>

      <RadioGroup onChange={setSelectedOption} value={selectedOption}>
        <VStack align="start" spacing={4}>
          {currentQuestion.options.map((option, index) => (
            <Radio key={index} value={index.toString()} size="lg">
              {option}
            </Radio>
          ))}
        </VStack>
      </RadioGroup>

      <Stack direction="row" justify="space-between" mt={8}>
        <Button colorScheme="teal" onClick={prevQuestion} isDisabled={currentQuestionIndex === 0}>Previous</Button>
        <Button colorScheme="teal" onClick={nextQuestion} isDisabled={currentQuestionIndex === questions.length - 1}>Next</Button>
      </Stack>

      <button className="submit-btn"  onClick={handleSubmit} >Submit Exam</button>
    </Box>
  );
};

export default QuestionScreen;
