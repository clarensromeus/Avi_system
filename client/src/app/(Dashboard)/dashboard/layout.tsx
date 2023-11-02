import React from "react";
import { Box } from "@chakra-ui/react";

// internally imports of resources
import { SidebarWithHeader } from "@/NavDrawer/DashBoardNavDrawer";

type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default function layout({ children, modal }: Props) {
  return (
    <>
      <SidebarWithHeader />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
        {modal}
      </Box>
    </>
  );
}
