import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import useShowToast from "../hooks/useShowToast";
import useLogout from "../hooks/useLogout";

const SettingsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const showToast = useShowToast();
  const logout = useLogout();

  const handlefreezeAccount = async () => {
    try {
      const res = await fetch("/api/v1/users/freeze", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.status === "error") {
        showToast("Error", data.message, "error");
        return;
      }

      if (data.status === "success") {
       await logout();
        onClose();
        showToast("Success", data.message, "success");
      }
    } catch (error) {
      showToast("Error: ", error.message, "error");
    }
  };

  return (
    <>
      <Text my={1} fontWeight={"bold"}>
        Freeze Your Account
      </Text>
      <Text>You can unfreeze your account anytime by logging in </Text>
      <Button size={"sm"} colorScheme="red" onClick={onOpen}>
        Freeze
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Freeze Account</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to freeze your account?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={handlefreezeAccount}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SettingsPage;
