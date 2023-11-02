"use client";

import React from "react";
import Image from "next/image";
import { Box, Flex, Stack, Text, VStack } from "@chakra-ui/react";

// internally crafted imports of resources
import { coursesList } from "@/Components/Course";

export default function page() {
  return (
    <>
      <Box>
        <Box>
          <Text>Explore all courses with us</Text>
        </Box>
        <Box pt={4}>
          <Flex justifyContent={"center"}>
            <Box w={"full"}>
              <Stack
                direction={"row"}
                display={"flex"}
                justifyContent={"center"}
                flexWrap={"wrap"}
                gap={9}
              >
                {coursesList.map((value, index) => {
                  return (
                    <Box
                      key={index}
                      boxShadow={"md"}
                      borderRadius={"2xl"}
                      w={"300px"}
                      px={"7"}
                      py={"6"}
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Box>
                        <Image
                          width={38}
                          height={38}
                          style={{ objectFit: "cover" }}
                          alt="image"
                          src={value.image}
                          priority
                        />
                      </Box>
                      <VStack>
                        <Text fontWeight="bold">{value.reference}</Text>
                        <Text>{value.days} </Text>
                      </VStack>
                    </Box>
                  );
                })}
              </Stack>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
