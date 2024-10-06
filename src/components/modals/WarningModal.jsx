import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from "@chakra-ui/react";

const WarningModal = ({ isOpen, onClose, onReEnterFullScreen }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Violation Warning</ModalHeader>
        <ModalBody>
          You have exited full-screen mode. Please click "OK" to re-enter
          full-screen mode and continue the exam.
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onReEnterFullScreen}>
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WarningModal;
