"use client";

import {
  Box,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  Heading,
  Text,
} from "@chakra-ui/react";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";

// internally crafted imports of resources
import { SidebarContent } from "./SideBarContent";
import { MobileNav } from "./MobileNav";

const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const path: string = usePathname();
  const routeLocations = path.slice(1).replaceAll("/", " / ");
  const segment = useSelectedLayoutSegment();

  return (
    <Box bg={useColorModeValue("gray.50", "gray.800")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Flex ml={{ base: 0, md: 60 }} px="4" py="2">
        <Box w={"full"}>
          <Box
            w={"inherit"}
            bg={useColorModeValue("gray.50", "gray.800")}
            display="flex"
            justifyContent={"space-between"}
          >
            <Heading color={"gray.600"} size={"md"}>
              {routeLocations}
            </Heading>
            <Text sx={{ color: "blue.400" }}>{segment}</Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default SidebarWithHeader;
