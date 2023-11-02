"use client";

import React from "react";
import {
  Box,
  Flex,
  HStack,
  Button,
  Input,
  InputRightElement,
  InputGroup,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Avatar,
  Tfoot,
  useDisclosure,
} from "@chakra-ui/react";
import { HiUserAdd } from "react-icons/hi";
import { MdPayment } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import Link from "next/link";

// internally crafted imports of resources
import { FaUserTie } from "react-icons/fa";
import CreateStudent from "@/Components/Student/createStudent";
import ImageFrame from "@/Components/ImageFrame";
import DeleteFrame from "@/Components/DeleteFrame";
import { useGetStudentsQuery } from "@/ReduxConfig/CodeSpliting/Students";

export default function Page() {
  const { onClose, isOpen, onOpen } = useDisclosure();

  const [search, setSearch] = React.useState<string>("");

  const { data } = useGetStudentsQuery(undefined, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const router = useRouter();

  const changeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as typeof event.target & {
      value: { value: string };
    };
  };

  const debounceSearchHandler = React.useMemo(() => {
    return debounce(changeEventHandler, 1000);
  }, [search]);

  React.useEffect(() => {
    return () => {
      debounceSearchHandler.cancel();
    };
  }, []);

  return (
    <>
      <CreateStudent isOpen={isOpen} onClose={onClose} />
      <Box pt="5" w={"full"}>
        <Flex w={"full"} justifyContent={"flex-end"}>
          <Box>
            <HStack gap={4}>
              <Button size={"md"} variant="solid" rightIcon={<FaUserTie />}>
                {data && data?.length < 10 ? `0${data?.length}` : data?.length}
              </Button>
              <Button
                size={"md"}
                colorScheme="twitter"
                variant={"solid"}
                leftIcon={<MdPayment />}
              >
                Pay
              </Button>
              <Button
                size={"md"}
                colorScheme="green"
                variant={"solid"}
                leftIcon={<HiUserAdd />}
                onClick={onOpen}
              >
                Create
              </Button>
              <Box>
                <InputGroup>
                  <Input
                    variant={"outline"}
                    placeholder="search..."
                    _focus={{ border: 1 }}
                    onChange={debounceSearchHandler}
                  />
                  <InputRightElement h={"full"}>
                    <Button size={"sm"} variant={"solid"} h={"full"}>
                      <FiSearch />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
            </HStack>
          </Box>
        </Flex>
        <Box pt={5} w={"full"}>
          <TableContainer>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Photo</Th>
                  <Th>Firstname</Th>
                  <Th>Lastname</Th>
                  <Th>Email</Th>
                  <Th>Class</Th>
                  <Th>DOB</Th>
                  <Th isNumeric>ID</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data
                  ?.filter((data) =>
                    search.toLowerCase() === ""
                      ? data
                      : data.Firstname.toLowerCase().includes(
                          search.toLowerCase()
                        )
                  )
                  .map((data) => {
                    return (
                      <Tr key={data.id}>
                        <Td
                        /*  onClick={() => {
                            router.push(`student/delete/${data.id}`);
                          }} */
                        >
                          <Link href={`student/delete/${data.id}`}>
                            <Avatar size={"md"} src={data.Avatar} />
                          </Link>
                        </Td>
                        <Td>{data.Firstname}</Td>
                        <Td>{data.Lastname}</Td>
                        <Td>{data.Email}</Td>
                        <Td>{data.Class}</Td>
                        <Td>{data.DOB} </Td>
                        <Td>{data.id.toString().slice(0, 12)}</Td>
                        <Td>
                          <HStack spacing={3}>
                            <DeleteFrame
                              id={data.id}
                              Identification="students"
                              Firstname={data.Firstname}
                              Lastname={data.Lastname}
                            />
                            <ImageFrame
                              id={data.id}
                              Identification="students"
                              Firstname={data.Firstname}
                              Lastname={data.Lastname}
                            />
                          </HStack>
                        </Td>
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
      </Box>
    </>
  );
}
