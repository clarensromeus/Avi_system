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
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { ClipLoader } from "react-spinners";

// internally crafted imports of resources
import { CreateProps } from "@/typing/Create";
import { StudentSignUp } from "@/validations/Signup";
import { useCreateStudentMutation } from "@/ReduxConfig/CodeSpliting/Students";
import useNotification from "@/hooks/notifications";
import { NotiTypeEnum } from "@/enum/notifications";
import { useUserProfileInfoQuery } from "@/ReduxConfig/NexjsApi";

export default function CreateStudent({ isOpen, onClose }: CreateProps) {
  const cancelRef = React.useRef(null);

  const { CreateNotification } = useNotification();
  const { data: userData } = useUserProfileInfoQuery();

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  type formData = z.infer<typeof StudentSignUp>;

  const { handleSubmit, control } = useForm<formData>({
    defaultValues: {
      Firstname: "",
      Lastname: "",
      Email: "",
      Password: "",
      Class: "",
      DOB: "",
    },
    resolver: zodResolver(StudentSignUp),
  });

  const [CreateStudent, { isLoading, isSuccess }] = useCreateStudentMutation();

  const ID = React.useId();

  const onSubmit = async (data: formData) => {
    try {
      if (!userData) return;
      await CreateStudent(data);

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
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);

  return (
    <>
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <AlertDialogHeader>Create a new student</AlertDialogHeader>
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
                              <FormErrorMessage>
                                {error.message}
                              </FormErrorMessage>
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
                          <FormControl
                            isInvalid={!!error}
                            id={`Lastname_${ID}`}
                          >
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
                    name="Password"
                    control={control}
                    render={({
                      field: { value, onChange },
                      fieldState: { error },
                    }) => (
                      <FormControl isInvalid={!!error} id="Password">
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                          <Input
                            name="Password"
                            value={value}
                            onChange={onChange}
                            id={`Password_${ID}`}
                            type={showPassword ? "text" : "password"}
                          />
                          <InputRightElement h={"full"}>
                            <Button
                              variant={"ghost"}
                              onClick={() =>
                                setShowPassword((showPassword) => !showPassword)
                              }
                            >
                              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        {error && (
                          <FormErrorMessage>{error.message} </FormErrorMessage>
                        )}
                      </FormControl>
                    )}
                  />
                  <HStack>
                    <Box w="50%">
                      <Controller
                        name="Class"
                        control={control}
                        render={({
                          field: { value, onChange },
                          fieldState: { error },
                        }) => (
                          <FormControl id="Class">
                            <FormLabel>Class</FormLabel>
                            <Select
                              placeholder="Select a Class"
                              name="Class"
                              value={value}
                              onChange={onChange}
                            >
                              <option value="9th grade">9th grade</option>
                              <option value="8th grade">8th grade</option>
                              <option value="1st grade">1st grade</option>
                              <option value="4th grade">4th grade</option>
                              <option value="7th grade">7th grade</option>
                            </Select>
                            {error && (
                              <FormErrorMessage>
                                {error.message}{" "}
                              </FormErrorMessage>
                            )}
                          </FormControl>
                        )}
                      />
                    </Box>
                    <Box w={"50%"}>
                      <Controller
                        name="DOB"
                        control={control}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <FormControl id={`DOB_${ID}`} isInvalid={!!error}>
                            <FormLabel>DOB</FormLabel>
                            <Input
                              placeholder="12/04/99"
                              name="DOB"
                              id={`DOB_${ID}`}
                              onChange={onChange}
                              value={value}
                              type="text"
                            />
                            {error && (
                              <FormErrorMessage>
                                {error.message}
                              </FormErrorMessage>
                            )}
                          </FormControl>
                        )}
                      />
                    </Box>
                  </HStack>
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
      </Box>
    </>
  );
}

/* 
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts */
