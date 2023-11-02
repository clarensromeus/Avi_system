import * as React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";

const NotFound = (): JSX.Element => {
  return (
    <>
      <Flex
        w={"full"}
        height={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box>
          <Image
            src="/notfound.png"
            alt="Picture of the author"
            width={270}
            height={270}
          />
        </Box>
      </Flex>
    </>
  );
};

export default NotFound;
