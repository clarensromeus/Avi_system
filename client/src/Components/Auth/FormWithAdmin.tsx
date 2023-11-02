"use client";

import React from "react";
import {
  Box,
  Stack,
  FormControl,
  HStack,
  FormLabel,
  Input,
  InputGroup,
  Button,
  InputRightElement,
  Text,
  Link,
  Select,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Role } from "@/enum/validator";
import { ClipLoader } from "react-spinners";

// internally crafted imports of resources
import { AdminSignup } from "@/validations/Signup";
import { useUserSignUpMutation } from "@/ReduxConfig/NexjsApi";

export default function FormWithAdmin() {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const toast = useToast();

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

  const ID = React.useId();

  const [SignUpTriggering, { data, isLoading, isSuccess }] =
    useUserSignUpMutation();

  const onSubmit = async (data: formData) => {
    try {
      await SignUpTriggering({
        Firstname: data.Firstname,
        Lastname: data.Lastname,
        Email: data.Email,
        Password: data.Password,
        Role: data.Role,
        IsRole: "ADMIN",
      });
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      toast({
        title: "User authentication",
        description: data?.message,
        status: data?.success === true ? "success" : "error",
        duration: 7000,
        isClosable: true,
      });
    }
  }, [isSuccess]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
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
                    isRequired
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
                  <FormControl
                    isInvalid={!!error}
                    id={`Lastname_${ID}`}
                    isRequired
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
                      <FormErrorMessage>{error.message} </FormErrorMessage>
                    )}
                  </FormControl>
                )}
              />
            </Box>
          </HStack>
          <Controller
            name="Email"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <FormControl id="Email" isInvalid={!!error} isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  name="Email"
                  value={value}
                  onChange={onChange}
                  id={`Email_${ID}`}
                  type="email"
                />
                {error && <FormErrorMessage>{error.message} </FormErrorMessage>}
              </FormControl>
            )}
          />
          <Controller
            name="Password"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <FormControl isInvalid={!!error} id={`Password_${ID}`} isRequired>
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
                {error && <FormErrorMessage>{error.message} </FormErrorMessage>}
              </FormControl>
            )}
          />
          <Controller
            name="Role"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <FormControl id="role" isRequired>
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
                {error && <FormErrorMessage>{error.message} </FormErrorMessage>}
              </FormControl>
            )}
          />
          <Stack spacing={10} pt={2}>
            <Button
              type="submit"
              loadingText="Submitting"
              size="lg"
              bg="#0866ff"
              color={"white"}
              _hover={{
                bg: "#0866ff",
              }}
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
                "Sign up"
              )}
            </Button>
          </Stack>
          <Stack pt={6}>
            <Text align={"center"}>
              Already a user?{" "}
              <Link as={NextLink} color={"blue.400"} href="/">
                Sign in
              </Link>
            </Text>
          </Stack>
        </Stack>
      </form>
    </>
  );
}
