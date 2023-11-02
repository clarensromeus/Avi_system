"use client";

import React from "react";
import { Flex, Box, Stack, Heading, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { redirect } from "next/navigation";

// internally crafted imports of resources
import FormWithAdmin from "./FormWithAdmin";
import Context from "@/context/context";
import FormWithStudent from "./FormWithStudent";
import { isAuthenticated } from "./isAuthenticated";

export default function SignUp(): JSX.Element {
  const state = React.useContext(Context);

  const isAuth = isAuthenticated(window.localStorage.getItem("TOKEN"));

  const { info } = state;

  React.useEffect(() => {
    if (isAuth) {
      redirect("/dashboard");
    }
  }, [isAuth]);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={2} mx={"auto"} maxW={"lg"} pt={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"3xl"} textAlign={"center"}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          w={"md"}
          maxW={"lg"}
          boxShadow={"lg"}
          p={8}
        >
          {info === "Student" ? <FormWithStudent /> : <FormWithAdmin />}
        </Box>
      </Stack>
    </Flex>
  );
}
