import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

const ConfirmationModal = ({ show, onClose, onConfirm, message }) => {
  if (!show) {
    return null;
  }
  return <div>ConfirmationModal</div>;
};

export default ConfirmationModal;
