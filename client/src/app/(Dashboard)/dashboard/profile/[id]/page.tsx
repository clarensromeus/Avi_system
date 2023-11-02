import React from "react";
import { Box } from "@chakra-ui/react";

// internally  crafted imports of resources
import PersonProfile from "@/Components/Profile/PersonProfile";

type Props = {
  params: {
    id: string;
  };
};

export default function Page({ params: { id } }: Props) {
  return (
    <>
      <Box>
        <PersonProfile id={id} />
      </Box>
    </>
  );
}
