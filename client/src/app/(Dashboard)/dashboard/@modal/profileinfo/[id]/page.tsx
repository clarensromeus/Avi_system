"use client";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  Stack,
  useColorModeValue,
  useDisclosure,
  Text,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { useGetSingleAdministratorQuery } from "@/ReduxConfig/CodeSpliting/Administrator";

interface Props {
  params: {
    id: number;
  };
}

export default function Page({ params: { id } }: Props) {
  const cancelRef = React.useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  const { data, isLoading } = useGetSingleAdministratorQuery({ id });

  React.useEffect(() => {
    onOpen();
  }, [id]);

  const bgColor = useColorModeValue("#151f21", "gray.900");
  const bgcolor1 = useColorModeValue("white", "gray.800");

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
          <AlertDialogHeader>Dicard Changes ?</AlertDialogHeader>
          <AlertDialogCloseButton onClick={() => router.back()} />
          <AlertDialogBody>
            {isLoading ? (
              <ClipLoader
                color="white"
                loading={isLoading}
                size={22}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              <Center py={6}>
                <Box
                  maxW={"400px"}
                  w={"full"}
                  bg={bgcolor1}
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
                      src={`${data?.Avatar}`}
                      css={{
                        border: "2px solid white",
                      }}
                    />
                  </Flex>

                  <Box p={6}>
                    <Stack spacing={0} align={"center"} mb={5}>
                      <Heading
                        fontSize={"2xl"}
                        fontWeight={500}
                        fontFamily={"body"}
                      >
                        {data?.Firstname} {data?.Lastname}
                      </Heading>
                      <Text color={"gray.500"}>School Administrator</Text>
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
                          <Text fontWeight={600}>Key role :</Text>
                        </Box>
                        <Box>
                          <Text fontSize={"sm"} color={"gray.500"}>
                            {data?.Role}
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
                            {"*".repeat(15)}
                          </Text>
                        </Box>
                      </HStack>
                    </Stack>

                    <Button
                      w={"full"}
                      mt={8}
                      bg={bgColor}
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
            )}
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
