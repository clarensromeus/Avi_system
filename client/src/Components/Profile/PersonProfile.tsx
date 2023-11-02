"use client";

import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  Image,
  HStack,
} from "@chakra-ui/react";
import React from "react";

// internally crafted imports of resources
import { useUserProfileInfoQuery } from "@/ReduxConfig/NexjsApi";

type Props = {
  id: string;
};

export default function PersonProfile({ id }: Props) {
  const { data } = useUserProfileInfoQuery(undefined, {
    refetchOnFocus: true,
  });

  return (
    <>
      <Center py={6}>
        <Box
          maxW={"400px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
        >
          <Image
            h={"100px"}
            w={"full"}
            src={
              "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            }
            objectFit="cover"
            alt="#"
          />
          <Flex justify={"center"} mt={-12}>
            <Avatar
              size={"xl"}
              src={
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
              }
              css={{
                border: "2px solid white",
              }}
            />
          </Flex>

          <Box p={6}>
            <Stack spacing={0} align={"center"} mb={5}>
              <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                {data?.Firstname} {data?.Lastname}
              </Heading>
              <Text color={"gray.500"}>
                School {data?.IsRole === "Admin" ? "Administrator" : "student"}{" "}
              </Text>
            </Stack>

            <Stack direction={"column"} justify={"center"} spacing={6}>
              <HStack
                justifyContent={"space-around"}
                spacing={0}
                align={"center"}
                w={"full"}
              >
                <Box>
                  <Text fontWeight={600}>Full name :</Text>
                </Box>
                <Box>
                  <Text fontSize={"sm"} color={"gray.500"}>
                    {data?.Firstname} {data?.Lastname}
                  </Text>
                </Box>
              </HStack>
              <HStack
                display={"flex"}
                justifyContent={"space-around"}
                spacing={0}
                w={"full"}
              >
                <Box>
                  <Text fontWeight={600}>
                    {data?.IsRole === "Admin" ? "Key role" : "S. class"} :
                  </Text>
                </Box>
                <Box>
                  <Text fontSize={"sm"} color={"gray.500"}>
                    {data?.IsRole === "Admin" ? data.Role : data?.Class}
                  </Text>
                </Box>
              </HStack>
              <HStack
                display={"flex"}
                justifyContent={"space-around"}
                spacing={0}
                w={"full"}
              >
                <Box alignSelf={"flex-start"}>
                  <Text fontWeight={600}>Pass code :</Text>
                </Box>
                <Box alignSelf={"flex-end"}>
                  <Text fontSize={"sm"} color={"gray.500"}>
                    {"*".repeat(13)}
                  </Text>
                </Box>
              </HStack>
            </Stack>

            <Button
              w={"full"}
              mt={8}
              bg={useColorModeValue("#151f21", "gray.900")}
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              Get more info...
            </Button>
          </Box>
        </Box>
      </Center>
    </>
  );
}
