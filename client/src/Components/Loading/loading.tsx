import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { CircleLoader } from "react-spinners";

type Props = {};

export default function Loading({}: Props) {
  return (
    <>
      <Flex
        w={"100%"}
        h={"100vh"}
        justifyContent="center"
        alignItems={"center"}
      >
        <Box>
          <CircleLoader
            color="black"
            loading={true}
            size={60}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Box>
      </Flex>
    </>
  );
}
