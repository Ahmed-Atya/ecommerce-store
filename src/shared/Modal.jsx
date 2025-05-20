import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
const CustomModal = ({
  isOpen,
  onOpen,
  onClose,
  title,
  children,
  okText,
  cancelText,
  handleOk,
  isLoading,
}) => {
  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isOpen}
        isLoading
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleOk}
              isLoading={isLoading}
            >
              {okText}
            </Button>
            <Button variant="ghost" onClick={onClose}>
              {cancelText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CustomModal;
