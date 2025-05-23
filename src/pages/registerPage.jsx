"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Link,
  Stack,
  Button,
  Heading,
  Text,
  InputRightElement,
  InputGroup,
  useColorModeValue,
  FormHelperText,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { registerUser } from "../app/features/registerSlice";
import { Navigate } from "react-router-dom";

const RegisterPage = ({ isAuthenticated }) => {
  // All hooks must be called unconditionally at the top
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isUserName, setIsUserName] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const dispatch = useDispatch();
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const boxBgColor = useColorModeValue("white", "gray.700");

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmitHandler = (e) => {
    console.log("clicked")
    e.preventDefault();
    if (!user.email && !user.password && !user.username) {
      setIsEmail(true);
      setIsPassword(true);
      setIsUserName(true);
      return;
    }
    if (!user.email) {
      setIsEmail(true);
      return;
    }
    if (!user.password) {
      setIsPassword(true);
      return;
    }
   
    if (!user.username) {
      setIsUserName(true);
      return;
    }

    setIsEmail(false);
    setIsPassword(false);
    setIsUserName(false);
    dispatch(registerUser(user));
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={bgColor}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          as="form"
          onSubmit={onSubmitHandler}
          rounded={"lg"}
          bg={boxBgColor}
          boxShadow={"lg"}
          w={"500px"}
          maxW={"lg"}
          p={8}
        >
          <Stack spacing={4}>
             <FormControl id="username" isRequired>
              <FormLabel>User Name</FormLabel>
              <Input
                type="text"
                name="username"
                placeContent="please enter your username"
                value={user.username}
                onChange={handleInputChange}
                isInvalid={isUserName}
                errorBorderColor="red.600"
              />
              {isUserName && (
                <FormHelperText textAlign={"left"} color={"red.500"}>
                  User name is required
                </FormHelperText>
              )}
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                placeContent="please enter your email"
                value={user.email}
                onChange={handleInputChange}
                isInvalid={isEmail}
                errorBorderColor="red.600"
              />
              {isEmail && (
                <FormHelperText textAlign={"left"} color={"red.500"}>
                  Email is required
                </FormHelperText>
              )}
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={user.password}
                  onChange={handleInputChange}
                  isInvalid={isPassword}
                  errorBorderColor="red.600"
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {isPassword && (
                <FormHelperText textAlign={"left"} color={"red.500"}>
                  Password is required
                </FormHelperText>
              )}
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button 
                type="submit"
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user? <Link color={"blue.400"} onClick={()=>{
                  window.location.href = "/login";
                }}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default RegisterPage;
