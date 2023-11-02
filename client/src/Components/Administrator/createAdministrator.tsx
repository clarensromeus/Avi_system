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
import { z } from "zod";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipLoader } from "react-spinners";

// internally crafted imports of resources
import { CreateProps } from "@/typing/Create";
import { AdminSignup } from "@/validations/Signup";
import { Role } from "@/enum/validator";
import { useCreateAdministratorMutation } from "@/ReduxConfig/CodeSpliting/Administrator";
import { NotiTypeEnum } from "@/enum/notifications";
import useNotification from "@/hooks/notifications";
import { useUserProfileInfoQuery } from "@/ReduxConfig/NexjsApi";

export default function CreateAdministrator({ isOpen, onClose }: CreateProps) {
  const cancelRef = React.useRef(null);

  const { CreateNotification } = useNotification();
  const { data: userData } = useUserProfileInfoQuery();

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  type formData = z.infer<typeof AdminSignup>;

  const { handleSubmit, control } = useForm<formData>({
    defaultValues: {
      Firstname: "",
      Lastname: "",
      Email: "",
      Password: "",
      Role: Role.NOTHING,
    },
    resolver: zodResolver(AdminSignup),
  });

  const [createAdministrator, { isLoading, isSuccess }] =
    useCreateAdministratorMutation();

  const ID = React.useId();

  const onSubmit = async (data: formData) => {
    try {
      if (!userData) return;

      await createAdministrator(data);

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
              <AlertDialogHeader>Create new admin</AlertDialogHeader>
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
                          <FormControl
                            id={`Firstname_${ID}`}
                            isInvalid={!!error}
                          >
                            <FormLabel>Firstname</FormLabel>
                            <Input
                              name="Firstname"
                              id={`Firstname_${ID}`}
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
                      <FormControl id="Email" isInvalid={!!error}>
                        <FormLabel>Email address</FormLabel>
                        <Input
                          name="Email"
                          value={value}
                          onChange={onChange}
                          id={`Email_${ID}`}
                          type="email"
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
                      <FormControl isInvalid={!!error} id={`Password_${ID}`}>
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
                  <Controller
                    name="Role"
                    control={control}
                    render={({
                      field: { value, onChange },
                      fieldState: { error },
                    }) => (
                      <FormControl id="role">
                        <FormLabel> Admin role</FormLabel>
                        <Select
                          placeholder="Select a role"
                          value={value}
                          onChange={onChange}
                        >
                          <option value="ADMINISTRATOR">ADMINISTRATOR</option>
                          <option value="SECRETARY">SECRETARY</option>
                          <option value="SIMPLE">SIMPLE</option>
                          <option value="SUPERVISOR">SUPERVISOR</option>
                          <option value="INSPECTOR">INSPECTOR</option>
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
                    w={"50%"}
                    sx={{ bg: "#0866ff", color: "white" }}
                    _hover={{ bg: "#0866ff", color: "white" }}
                    ml={3}
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
