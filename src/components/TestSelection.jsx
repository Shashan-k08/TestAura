import React from "react";
import { Box, Heading, Button, VStack } from "@chakra-ui/react";

const TestSelection = ({ onSelectTest }) => {
  return (
    <Box textAlign="center" p={10}>
      <Heading mb={6} color="teal.500">
        Select a Test
      </Heading>
      <VStack spacing={4}>
        <Button
          colorScheme="teal"
          size="lg"
          onClick={() => onSelectTest("html")}
        >
          HTML Test
        </Button>
        <Button
          colorScheme="blue"
          size="lg"
          onClick={() => onSelectTest("reactjs")}
        >
          ReactJS Test
        </Button>
        <Button
          colorScheme="purple"
          size="lg"
          onClick={() => onSelectTest("css")}
        >
          CSS Test
        </Button>
      </VStack>
    </Box>
  );
};

export default TestSelection;
