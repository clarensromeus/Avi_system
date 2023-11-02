"use client";

// external imports of resources
import React from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useRouter, redirect } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { ClipLoader } from "react-spinners";

// internally crafted imports of resources
import { LoginSchemaWithEmail } from "@/validations/SignIn";
import Context from "@/context/context";
import { isAuthenticated } from "./isAuthenticated";
import { useUserSignInMutation } from "@/ReduxConfig/NexjsApi";

export default function SignIn(): JSX.Element {
  const [showPassword, setShowPassword] = React.useState(false);

  const isAuth = isAuthenticated(window.localStorage.getItem("TOKEN"));

  const ContextIdentifier = React.useContext(Context);

  const { info } = ContextIdentifier;

  const toast = useToast();

  const [SignIn, { data, isLoading, isSuccess }] = useUserSignInMutation();

  type formData = z.infer<typeof LoginSchemaWithEmail>;

  const ID = React.useId();
  const router = useRouter();

  const { handleSubmit, control } = useForm<formData>({
    defaultValues: {
      Email: "",
      Password: "",
    },
    resolver: zodResolver(LoginSchemaWithEmail),
  });

  const onSubmit = async (data: formData) => {
    try {
      await SignIn({
        Email: data.Email,
        Password: data.Password,
        IsRole: info === "Administrator" ? "Admin" : "Student",
      });
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  React.useEffect(() => {
    if (isAuth) {
      redirect("/dashboard");
    }

    if (isSuccess) {
      toast({
        title: "User authentication",
        description: data?.message,
        status: data?.success ? "success" : "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [isAuth, isSuccess]);

  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"2xl"}>Sign in with your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              we are happy you are interested 👏
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            w={"md"}
            p={8}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <Controller
                  name="Email"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <FormControl id="email" isInvalid={!!error} isRequired>
                        <FormLabel>Email address</FormLabel>
                        <Input
                          type="text"
                          name="Email"
                          id={`Email_${ID}`}
                          value={value}
                          onChange={onChange}
                        />
                        {error && (
                          <FormErrorMessage>{error.message}</FormErrorMessage>
                        )}
                      </FormControl>
                    </>
                  )}
                />
                <Controller
                  name="Password"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <FormControl id="password" isInvalid={!!error} isRequired>
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input
                          type={showPassword ? "text" : "password"}
                          name="Password"
                          id={`Password_${ID}`}
                          value={value}
                          onChange={onChange}
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
                        <FormErrorMessage>{error.message}</FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                />

                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox size={"md"} colorScheme={"blue"}>
                      Remember me
                    </Checkbox>
                    <Text color={"blue.400"}>Forgot password?</Text>
                  </Stack>
                  <Box display="flex" flexDirection="column" gap={1}>
                    <Button
                      type="submit"
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
                        "Sign in"
                      )}
                    </Button>
                    <Stack alignSelf="flex-end">
                      <Text align={"center"}>
                        No account?{" "}
                        <Link color={"blue.400"} href="/signup">
                          Sign up
                        </Link>
                      </Text>
                    </Stack>
                  </Box>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
