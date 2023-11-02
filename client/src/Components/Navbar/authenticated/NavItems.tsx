import { Box, Flex, Icon } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { last } from "lodash";

// internally crafted imports of resources
import { NavItemProps } from "@/typing/validation";

export const NavItem = ({ icon, children, name, ...rest }: NavItemProps) => {
  const pathname: string = usePathname();

  const path: string[] = pathname.split("/");
  const pathtesting = useSelectedLayoutSegment();

  const router = useRouter();

  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        sx={{
          bg: name.toLowerCase() === last(path) ? "blue.400" : "white",
          color: name.toLowerCase() === last(path) ? "white" : "black",
        }}
        role="group"
        cursor="pointer"
        _hover={{
          bg: "blue.400",
          color: "white",
        }}
        {...rest}
        onClick={() => {
          if (name === "Dashboard") {
            router.push(`/${name.toLowerCase()}`);
          } else {
            router.push(`/dashboard/${name.toLowerCase()}`);
          }
        }}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};
