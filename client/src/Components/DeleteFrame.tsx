"use client";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { MdDelete } from "react-icons/md";

// internally crafted imports of resources
import { useDeleteTeacherMutation } from "@/ReduxConfig/CodeSpliting/Teacher";
import { useDeleteAdministratorMutation } from "@/ReduxConfig/CodeSpliting/Administrator";
import { useDeleteStudentMutation } from "@/ReduxConfig/CodeSpliting/Students";
import useNotification from "@/hooks/notifications";
import { NotiTypeEnum } from "@/enum/notifications";
import { useUserProfileInfoQuery } from "@/ReduxConfig/NexjsApi";
import { IFrame } from "@/typing/Create";

export default function DeleteFrame({
  id,
  Identification,
  Firstname,
  Lastname,
}: IFrame) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);

  const { CreateNotification } = useNotification();
  const { data } = useUserProfileInfoQuery();

  // Delete administrator mutation
  const [
    DeleteAdmin,
    { isLoading: isAdminLoading, isSuccess: isAdminSuccess },
  ] = useDeleteAdministratorMutation();

  // Delete Student mutation
  const [
    DeleteStudent,
    { isLoading: isStudentLoading, isSuccess: isStudentSuccess },
  ] = useDeleteStudentMutation();

  // Delete Teacher mutation
  const [
    DeleteTeacher,
    { isLoading: isTeacherLoading, isSuccess: isTeacherSuccess },
  ] = useDeleteTeacherMutation();

  React.useEffect(() => {
    if (isAdminSuccess || isStudentSuccess || isTeacherSuccess) {
      onClose();
    }
  }, [isAdminSuccess, isStudentSuccess, isTeacherSuccess]);

  return (
    <>
      <IconButton
        size={"sm"}
        aria-label="delete"
        onClick={onOpen}
        icon={<MdDelete size={21} color={"red"} />}
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You cannot undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                _hover={{ bg: "#0866ff", color: "white" }}
                sx={{ bg: "#0866ff", color: "white" }}
                onClick={async () => {
                  try {
                    if (!data) return;
                    if (Identification === "administrators") {
                      await DeleteAdmin({ id });
                      await CreateNotification({
                        NotiType: NotiTypeEnum.DELETE,
                        PerformerFirstname: Firstname,
                        PerformerLastname: Lastname,
                        NotisenderId: data.id,
                      });
                    }

                    if (Identification === "students") {
                      await DeleteStudent({ id });
                      await CreateNotification({
                        NotiType: NotiTypeEnum.DELETE,
                        PerformerFirstname: Firstname,
                        PerformerLastname: Lastname,
                        NotisenderId: data.id,
                      });
                    }

                    await DeleteTeacher({ id });
                    await CreateNotification({
                      NotiType: NotiTypeEnum.DELETE,
                      PerformerFirstname: Firstname,
                      PerformerLastname: Lastname,
                      NotisenderId: data.id,
                    });
                  } catch (error) {
                    throw new Error(`${error}`);
                  }
                }}
                ml={3}
              >
                {isAdminLoading || isStudentLoading || isStudentLoading
                  ? ""
                  : "Delete"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
