"use client";

import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useTestingApiQuery } from "@/ReduxConfig/NexjsApi";

type Props = {};

export default function Page({}: Props) {
  const { data, isLoading, error } = useTestingApiQuery();

  console.log(error);
  console.log(data);

  return (
    <>
      <Box>
        {isLoading && <Text>loading...</Text>}
        <Box>try for a good result first</Box>
        <Text>{data?.data}</Text>
      </Box>
    </>
  );
}
