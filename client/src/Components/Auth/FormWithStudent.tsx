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
import { ClipLoader } from "react-spinners";

// internally crafted imports of resources
import { StudentSignUp } from "@/validations/Signup";
import { useUserSignUpMutation } from "@/ReduxConfig/NexjsApi";

type Props = {};

export default function FormWithStudent({}: Props) {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const toast = useToast();

  const [SignUpTriggering, { data, isLoading, isSuccess, status }] =
    useUserSignUpMutation();

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

  const ID = React.useId();

  const onSubmit = async (data: formData) => {
    try {
      await SignUpTriggering({
        Firstname: data.Firstname,
        Lastname: data.Lastname,
        Email: data.Email,
        Password: data.Password,
        Class: data.Class,
        DOB: data.DOB,
        IsRole: "STUDENT",
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
              <FormControl id="email" isInvalid={!!error} isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  name="Email"
                  value={value}
                  onChange={onChange}
                  id={`Email_${ID}`}
                  type="text"
                />
                {error && <FormErrorMessage>{error.message} </FormErrorMessage>}
              </FormControl>
            )}
          />
          <Controller
            name="Password"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <FormControl isInvalid={!!error} id="Password" isRequired>
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
          <HStack>
            <Box w="50%">
              <Controller
                name="Class"
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <FormControl id="Class" isRequired>
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
                      <FormErrorMessage>{error.message} </FormErrorMessage>
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
                  <FormControl id={`DOB_${ID}`} isInvalid={!!error} isRequired>
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
                      <FormErrorMessage>{error.message}</FormErrorMessage>
                    )}
                  </FormControl>
                )}
              />
            </Box>
          </HStack>
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
