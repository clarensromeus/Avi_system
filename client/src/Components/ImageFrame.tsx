import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  FormLabel,
  IconButton,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { ClipLoader } from "react-spinners";

// internally crafted imports of resources
import { FcAddImage } from "react-icons/fc";
import { MdEdit } from "react-icons/md";
import { IUpload } from "@/typing/Profile";
import uploadFile from "@/services/Upload";
import { useEditAdministratorMutation } from "@/ReduxConfig/CodeSpliting/Administrator";
import { useEditStudentMutation } from "@/ReduxConfig/CodeSpliting/Students";
import { useEditTeacherMutation } from "@/ReduxConfig/CodeSpliting/Teacher";
import useNotification from "@/hooks/notifications";
import { NotiTypeEnum } from "@/enum/notifications";
import { useUserProfileInfoQuery } from "@/ReduxConfig/NexjsApi";
import { IFrame } from "@/typing/Create";

export default function ImageFrame({
  id,
  Identification,
  Firstname,
  Lastname,
}: IFrame) {
  const cancelRef = React.useRef(null);

  const { CreateNotification } = useNotification();
  const { data } = useUserProfileInfoQuery();

  const [image, setImage] = React.useState<File | undefined>();

  const [previewImage, setPreviewImage] = React.useState<string>("");
  const [isValid, setValid] = React.useState<boolean>(false);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const validity = e.target.validity;
    const selectedFile = e.target.files as FileList;

    if (validity && validity.valid) {
      const FileData = uploadFile({
        FileInfo: { file: selectedFile, valid: validity.valid },
      }) satisfies IUpload;

      setValid(Boolean(FileData?.valid));
      setImage(FileData?.ImageInfo?.singleFile);
      setPreviewImage(`${FileData?.ImageInfo?.previewImage}`);
    }
  };

  const [EditAdmin, { isLoading: isAdminLoading, isSuccess: isAdminSuccess }] =
    useEditAdministratorMutation();

  const [
    EditStudent,
    { isLoading: isStudentLoading, isSuccess: isStudentSuccess },
  ] = useEditStudentMutation();

  const [
    EditTeacher,
    { isLoading: isTeacherLoading, isSuccess: isTeacherSuccess },
  ] = useEditTeacherMutation();

  React.useEffect(() => {
    if (isAdminSuccess || isStudentSuccess || isTeacherSuccess) {
      onClose();
    }
  }, [isAdminSuccess, isStudentSuccess, isTeacherSuccess]);

  return (
    <>
      <IconButton
        size={"sm"}
        aria-label="edit"
        onClick={onOpen}
        icon={<MdEdit color="blue" size={21} />}
      />
      <Box>
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />

          <AlertDialogContent>
            <form
              onSubmit={async () => {
                try {
                  if (!image) return;
                  if (!data) return;

                  if (Identification === "administrators") {
                    await EditAdmin({ id, ImageFIle: image });
                    await CreateNotification({
                      NotiType: NotiTypeEnum.EDIT,
                      PerformerFirstname: Firstname,
                      PerformerLastname: Lastname,
                      NotisenderId: data.id,
                    });
                  }

                  if (Identification === "students") {
                    await EditStudent({ id, ImageFile: image });
                    await CreateNotification({
                      NotiType: NotiTypeEnum.EDIT,
                      PerformerFirstname: Firstname,
                      PerformerLastname: Lastname,
                      NotisenderId: data.id,
                    });
                  }

                  await EditTeacher({ id, ImageFile: image });
                  await CreateNotification({
                    NotiType: NotiTypeEnum.EDIT,
                    PerformerFirstname: Firstname,
                    PerformerLastname: Lastname,
                    NotisenderId: data.id,
                  });
                } catch (error) {
                  throw new Error(`${error}`);
                }
              }}
            >
              <AlertDialogHeader>Select a Photo ?</AlertDialogHeader>
              <AlertDialogCloseButton onClick={() => setValid(false)} />
              <AlertDialogBody>
                <Box w={"full"} h={"220px"}>
                  <Center w={"inherit"} h={"inherit"}>
                    {!isValid && (
                      <IconButton
                        bgColor={"white"}
                        _hover={{ bg: "white" }}
                        aria-label="select"
                        icon={<FcAddImage size={160} />}
                        htmlFor="input-file"
                        as={FormLabel}
                      />
                    )}

                    <input
                      type="file"
                      id="input-file"
                      onChange={upload}
                      style={{ display: "none" }}
                    />
                    {isValid && (
                      <Image
                        alt="upload"
                        w={"full"}
                        height={"200px"}
                        src={previewImage}
                      />
                    )}
                  </Center>
                </Box>
              </AlertDialogBody>
              <AlertDialogFooter
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  colorScheme="white"
                  type="submit"
                  bg="black"
                  disabled
                  ref={cancelRef}
                  w={"full"}
                >
                  {isStudentLoading || isTeacherLoading || isAdminLoading ? (
                    <ClipLoader
                      color="white"
                      loading={
                        isStudentLoading || isTeacherLoading || isAdminLoading
                      }
                      size={20}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    "Upload"
                  )}
                </Button>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      </Box>
    </>
  );
}
