import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";



export default function CustomAlertDialog({
  isOpen,
  onOpen,
  onClose,
  title,
  description,
  okTxt,
  cancelText,
  okHandler,
  isLoading
}) {
  const cancelRef = useRef();

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        onOpen={onOpen}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader> {title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{description} </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {cancelText}
            </Button>
        
        <Button colorScheme="red" ml={3} onClick={okHandler} isLoading={isLoading}>
              {okTxt}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
