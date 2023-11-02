"use client";

import {
  Box,
  Text,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useColorModeValue,
  Flex,
  Avatar,
  Icon,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { FiBell } from "react-icons/fi";
import { FaClock } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import { ClipLoader } from "react-spinners";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

// internally crafted imports of resources
import { useGetAllNotificationsQuery } from "@/ReduxConfig/CodeSpliting/Notification";
import { NotiTypeEnum } from "@/enum/notifications";

type Props = {};

export default function Notifications({}: Props) {
  const { data, isLoading } = useGetAllNotificationsQuery(undefined, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            bg={useColorModeValue("gray.50", "gray.800")}
            sx={{ position: "relative !important" }}
            icon={
              <>
                <FiBell />
                <Box
                  as={"span"}
                  color={"white"}
                  position={"absolute"}
                  top={"6px"}
                  right={"4px"}
                  fontSize={"0.8rem"}
                  bgColor={"red"}
                  borderRadius={"full"}
                  zIndex={9999}
                  p={"2px"}
                >
                  {data && data?.length < 10
                    ? `0${data?.length}`
                    : data?.length}
                </Box>
              </>
            }
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>
            <Text fontWeight={"bold"}>Notifications</Text>
          </PopoverHeader>
          <PopoverBody>
            {isLoading ? (
              <Box py={6}>
                <ClipLoader
                  color="white"
                  loading={isLoading}
                  size={50}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </Box>
            ) : (
              <Flex flexDir={"column"} w={"full"}>
                <Box w={"full"} display={"flex"} flexDir={"column"} gap={2}>
                  {data?.map((notifications, index) => {
                    return (
                      <Flex
                        gap={3}
                        alignItems={"flex-start"}
                        alignContent={"flex-start"}
                        key={index}
                      >
                        <Box>
                          <Avatar
                            size="md"
                            src={notifications.NotiSender.Avatar}
                          />
                        </Box>
                        <Box display={"flex"} flexDir={"column"}>
                          <Box>
                            <Text fontWeight={"bold"} as={"span"}>
                              {notifications.PerformerFirstname.charAt(
                                0
                              ).toUpperCase()}
                              . {notifications.PerformerLastname}
                            </Text>
                            <Text as={"span"}>
                              {notifications.NotiType === NotiTypeEnum.CREATE
                                ? " added by "
                                : notifications.NotiType === NotiTypeEnum.EDIT
                                ? " updated by "
                                : " deleted by "}
                            </Text>
                            <Text as={"span"} fontWeight={"bold"}>
                              {" "}
                              {notifications.NotiSender.Firstname.charAt(
                                0
                              ).toUpperCase()}
                              . {notifications.NotiSender.Lastname}
                            </Text>
                          </Box>
                          <Box
                            display="flex"
                            alignItems={"center"}
                            alignContent={"center"}
                            gap={3}
                          >
                            <Icon as={FaClock} color={"gray.400"} />
                            <Text fontSize={"0.9rem"} color="gray.500">
                              {dayjs(`${notifications.createdAt}`).fromNow()}
                            </Text>
                          </Box>
                        </Box>
                      </Flex>
                    );
                  })}
                </Box>
              </Flex>
            )}

            <Box>
              <Button
                variant={"ghost"}
                colorScheme="twitter"
                leftIcon={<BiPlus />}
                _hover={{ bg: "white" }}
              >
                see more...
              </Button>
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}
