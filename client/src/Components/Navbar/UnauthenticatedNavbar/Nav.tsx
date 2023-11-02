"use client";

import React from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

// internally crafted imports of resources
import Context from "@/context/context";

export default function NavBar() {
  const { isOpen, onToggle } = useDisclosure();

  const state = React.useContext(Context);

  const { info, setInfo } = state;

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
        w={"100%"}
        position={"fixed"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
            fontSize={"2xl"}
          >
            Avi_system
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                {info}
              </MenuButton>
              <MenuList>
                <MenuItem minH="48px" onClick={() => setInfo("Administrator")}>
                  <Image
                    boxSize="2rem"
                    borderRadius="full"
                    src="/Admin.png"
                    alt="Fluffybuns the destroyer"
                    mr="12px"
                  />
                  <span>Administrator</span>
                </MenuItem>
                <MenuItem minH="40px" onClick={() => setInfo("Student")}>
                  <Image
                    boxSize="2rem"
                    borderRadius="full"
                    src="/User.png"
                    alt="Simon the pensive"
                    mr="12px"
                  />
                  <span>Student</span>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            as={NextLink}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            href={"/"}
            // onClick={() => router.push("/")}
          >
            Sign In
          </Button>
          <Button
            as={NextLink}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"#0866ff"}
            href={"/signup"}
            _hover={{
              bg: "#0866ff",
            }}
          >
            Sign Up
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
}
