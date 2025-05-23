"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
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
import { loginUser } from "../app/features/loginSlice";
import { Navigate } from "react-router-dom";

const LoginPage = ({ isAuthenticated }) => {
  // All hooks must be called unconditionally at the top
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    identifier: "",
    password: "",
  });

  const dispatch = useDispatch();
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const boxBgColor = useColorModeValue("white", "gray.700");


  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!user.identifier && !user.password) {
      setIsEmail(true);
      setIsPassword(true);
      return;
    }
    if (!user.identifier) {
      setIsEmail(true);
      return;
    }
    if (!user.password) {
      setIsPassword(true);
      return;
    }
    setIsEmail(false);
    setIsPassword(false);
    dispatch(loginUser(user));

  };
    if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }


  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={bgColor}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool{" "}
            <Text as={"span"} color={"blue.400"}>
              features
            </Text>{" "}
            ✌️
          </Text>
        </Stack>
        <Box
          as={"form"}
          onSubmit={onSubmitHandler}
          rounded={"lg"}
          bg={boxBgColor}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="identifier">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="identifier"
                value={user.identifier}
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
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.400"}>Forgot password?</Text>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
              >
                Sign in
              </Button>
                <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Text color={"blue.400"}>don not have an account?</Text>
                <Text
                  as={"router-link"}
                  to={"/register"}
                  textDecoration={"underline"}
                  _hover={{ cursor: "pointer" }}
                  fontSize={"lg"}
                  
                  color={"white"}

                  onClick={() => {
                    Navigate("/register");
                  }}
                >
                  Register
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginPage;