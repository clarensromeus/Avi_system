"use client";

import React from "react";
import {
  Box,
  Flex,
  HStack,
  Text,
  VStack,
  IconButton,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tfoot,
  Tbody,
  Td,
  Avatar,
} from "@chakra-ui/react";
import { FaChalkboardTeacher, FaUserTie, FaUserLock } from "react-icons/fa";
import { useGetAdministratorsQuery } from "@/ReduxConfig/CodeSpliting/Administrator";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data } = useGetAdministratorsQuery();

  const router = useRouter();

  return (
    <>
      <Flex justifyContent={"center"} alignItems={"center"}>
        <HStack gap={9} w={"full"}>
          <Box
            boxShadow={"md"}
            borderRadius={"2xl"}
            w={"330px"}
            px={"7"}
            py={"6"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              <IconButton
                variant="ghost"
                aria-label="open menu"
                icon={<FaUserTie size={"xlg"} />}
              />
            </Box>
            <VStack>
              <Text fontWeight="bold">Students</Text>
              <Text>12</Text>
            </VStack>
          </Box>
          <Box
            boxShadow={"md"}
            borderRadius={"2xl"}
            w={"330px"}
            px={"7"}
            py={"6"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              <IconButton
                variant="ghost"
                aria-label="open menu"
                icon={<FaChalkboardTeacher size={"xlg"} />}
              />
            </Box>
            <VStack>
              <Text fontWeight="bold">Teachers</Text>
              <Text>24</Text>
            </VStack>
          </Box>
          <Box
            boxShadow={"md"}
            borderRadius={"2xl"}
            w={"330px"}
            px={"7"}
            py={"6"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              <IconButton
                variant="ghost"
                aria-label="open menu"
                icon={<FaUserLock size={"xlg"} />}
              />
            </Box>
            <VStack>
              <Text fontWeight="bold">Administrators</Text>
              <Text>17</Text>
            </VStack>
          </Box>
        </HStack>
      </Flex>
      <Box pt={"5"}>
        <Text>Administrators board</Text>
      </Box>
      <Box pt={"4"} w={"full"}>
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Photo</Th>
                <Th>Firstname</Th>
                <Th>Lastname</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>ID</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((data) => {
                return (
                  <Tr key={data.id}>
                    <Td
                      onClick={() =>
                        router.push(`dashboard/profileinfo/${data.id}`)
                      }
                    >
                      <Avatar size={"md"} src={data.Avatar} />
                    </Td>
                    <Td>{data.Firstname}</Td>
                    <Td>{data.Lastname}</Td>
                    <Td>{data.Email}</Td>
                    <Td>{data.Role}</Td>
                    <Td>{data.id.toString().slice(0, 15)}</Td>
                  </Tr>
                );
              })}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Photo</Th>
                <Th>Firstname</Th>
                <Th>Lastname</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th isNumeric>ID</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
