"use client";

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
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Stack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { ClipLoader } from "react-spinners";

// internally crafted imports of resources
import { CreateProps } from "@/typing/Create";
import { TeacherValidation } from "@/validations/Teacher";
import { useCreateTeacherMutation } from "@/ReduxConfig/CodeSpliting/Teacher";
import { NotiTypeEnum } from "@/enum/notifications";
import useNotification from "@/hooks/notifications";
import { useUserProfileInfoQuery } from "@/ReduxConfig/NexjsApi";

export default function CreateTeacher({ onClose, isOpen }: CreateProps) {
  const cancelRef = React.useRef(null);

  const { data: userData } = useUserProfileInfoQuery();

  const { CreateNotification, cisSuccess } = useNotification();

  const [CreateTeacher, { isLoading, isSuccess }] = useCreateTeacherMutation();

  type formData = z.infer<typeof TeacherValidation>;

  const { handleSubmit, control } = useForm<formData>({
    defaultValues: {
      Firstname: "",
      Lastname: "",
      Email: "",
      PhoneNumber: "",
      Course: "",
    },
    resolver: zodResolver(TeacherValidation),
  });

  const ID = React.useId();

  const onSubmit = async (data: formData) => {
    try {
      if (!userData) return;

      await CreateTeacher(data);
      await CreateNotification({
        NotiType: NotiTypeEnum.CREATE,
        PerformerFirstname: data.Firstname,
        PerformerLastname: data.Lastname,
        NotisenderId: userData.id,
      });
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  React.useEffect(() => {
    if (isSuccess && cisSuccess) {
      onClose();
    }
  }, [isSuccess]);

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <AlertDialogHeader>Create new Teacher</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              <Stack spacing={2}>
                <HStack>
                  <Box>
                    <Controller
                      name="Firstname"
                      control={control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <FormControl id="Firstname" isInvalid={!!error}>
                          <FormLabel>Firstname</FormLabel>
                          <Input
                            name="Firstname"
                            id="Firstname"
                            onChange={onChange}
                            value={value}
                            type="text"
                          />
                          {error && (
                            <FormErrorMessage>{error.message}</FormErrorMessage>
                          )}
                        </FormControl>
                      )}
                    />
                  </Box>
                  <Box>
                    <Controller
                      name="Lastname"
                      control={control}
                      render={({
                        field: { value, onChange },
                        fieldState: { error },
                      }) => (
                        <FormControl isInvalid={!!error} id={`Lastname_${ID}`}>
                          <FormLabel>Lastname</FormLabel>
                          <Input
                            value={value}
                            onChange={onChange}
                            name="Lastname"
                            id={`Lastname_${ID}`}
                            type="text"
                          />
                          {error && (
                            <FormErrorMessage>
                              {error.message}{" "}
                            </FormErrorMessage>
                          )}
                        </FormControl>
                      )}
                    />
                  </Box>
                </HStack>
                <Controller
                  name="Email"
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <FormControl id="email" isInvalid={!!error}>
                      <FormLabel>Email address</FormLabel>
                      <Input
                        name="Email"
                        value={value}
                        onChange={onChange}
                        id={`Email_${ID}`}
                        type="text"
                      />
                      {error && (
                        <FormErrorMessage>{error.message} </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  name="PhoneNumber"
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <FormControl isInvalid={!!error} id="Password">
                      <FormLabel>Phone number</FormLabel>
                      <InputGroup>
                        <InputLeftAddon children="+509" />
                        <Input
                          value={value}
                          name="PhoneNumber"
                          onChange={onChange}
                          id={`PhoneNumber_${ID}`}
                          type="tel"
                          placeholder="phone number"
                        />
                      </InputGroup>
                      {error && (
                        <FormErrorMessage>{error.message} </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  name="Course"
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <FormControl id="Course">
                      <FormLabel>Course</FormLabel>
                      <Select
                        placeholder="Select a Course"
                        name="Course"
                        value={value}
                        onChange={onChange}
                      >
                        <option value="Mathematics">Mathematics</option>
                        <option value="Social science">Social science</option>
                        <option value="Spanish">Spanish</option>
                        <option value="English">English</option>
                        <option value="Desktop computing">
                          Desktop computing
                        </option>
                      </Select>
                      {error && (
                        <FormErrorMessage>{error.message} </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                />
              </Stack>
            </AlertDialogBody>
            <AlertDialogFooter
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <HStack w={"full"}>
                <Button w={"50%"} ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  _hover={{ bg: "#0866ff", color: "white" }}
                  w={"50%"}
                  sx={{ bg: "#0866ff", color: "white" }}
                  colorScheme="red"
                >
                  {isLoading ? (
                    <ClipLoader
                      color="white"
                      loading={isLoading}
                      size={20}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    "Create"
                  )}
                </Button>
              </HStack>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
