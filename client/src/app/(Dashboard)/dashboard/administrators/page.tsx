"use client";

import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { FaMoneyBill, FaUserLock } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { HiUserAdd } from "react-icons/hi";
import { debounce } from "lodash";

// externally crafted imports of resources
import CreateAdministrator from "@/Components/Administrator/createAdministrator";
import ImageFrame from "@/Components/ImageFrame";
import DeleteFrame from "@/Components/DeleteFrame";
import { useGetAdministratorsQuery } from "@/ReduxConfig/CodeSpliting/Administrator";

export default function Page(): JSX.Element {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [search, setSearch] = React.useState<string>("");

  const { data } = useGetAdministratorsQuery(undefined, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const changeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as typeof event.target & {
      value: { value: string };
    };
    setSearch(target.value);
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
      <CreateAdministrator isOpen={isOpen} onClose={onClose} />
      <Box pt="5" w={"full"}>
        <Flex w={"full"} justifyContent={"flex-end"}>
          <Box>
            <HStack gap={4}>
              <Button size={"md"} variant="solid" rightIcon={<FaUserLock />}>
                {data && data.length < 10 ? `0${data.length}` : data?.length}
              </Button>
              <Button
                size={"md"}
                colorScheme="twitter"
                variant={"solid"}
                leftIcon={<FaMoneyBill />}
              >
                Salary
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
                    onChange={debounceSearchHandler}
                    _focus={{ border: 1 }}
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
                  <Th>Role</Th>
                  <Th isNumeric>ID</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data
                  ?.filter((data) =>
                    search.length === 0
                      ? data
                      : data.Firstname.toLowerCase().includes(
                          search.toLowerCase()
                        )
                  )
                  .map((data) => {
                    return (
                      <Tr key={data.id}>
                        <Td>
                          <Avatar size={"md"} src={data.Avatar} />
                        </Td>
                        <Td>{data.Firstname}</Td>
                        <Td>{data.Lastname}</Td>
                        <Td>{data.Email}</Td>
                        <Td>{data.Role}</Td>
                        <Td>{data.id.toString().slice(0, 15)}</Td>
                        <Td>
                          <HStack spacing={3}>
                            <DeleteFrame
                              id={data.id}
                              Identification="administrators"
                              Firstname={data.Firstname}
                              Lastname={data.Lastname}
                            />
                            <ImageFrame
                              id={data.id}
                              Firstname={data.Firstname}
                              Lastname={data.Lastname}
                              Identification="administrators"
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
