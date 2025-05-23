"use client";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  IconButton,
  Text,
  Container,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import cookieService from "../services/cookies";
import { selectedCart } from "../app/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { onOpenCartDrawerAction } from "../app/features/globalSlice";
import { PiShoppingCartSimple } from "react-icons/pi";
const Links = ["products", "dashboard"];
const token = cookieService.get("jwt");
const NavLink = ({ children }) => {
  return (
    <Link
      as={RouterLink}
      to={`/${children.toLowerCase()}`}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      {children}
    </Link>
  );
};

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleLogout = () => {
    cookieService.remove("jwt");
    window.location.reload();
  };

  const { cartItems } = useSelector(selectedCart);

  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(onOpenCartDrawerAction());
  };
  return (
    <Container maxWidth="100%" sx={{ mt: 4 }}>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <Link as={RouterLink} to="/">
              Home
            </Link>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <HStack spacing={8} alignItems={"center"}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Button onClick={handleOpen} cursor={"pointer"} marginRight={4}>
              <PiShoppingCartSimple size={25} />
              <Text h={5} w={5} borderRadius={"50%"} bgColor={"red"}> {cartItems.length}</Text>
            </Button>
            {token ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
             <>
              <Link as={RouterLink} to="/login">
                login
              </Link>
              <Link as={RouterLink} to="/login">
                login
              </Link>
             </>
            )}
          </HStack>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </Container>
  );
}
