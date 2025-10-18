import {
  Container,
  Flex,
  Input,
  Text,
  HStack,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun, LuEye, LuEyeOff } from "react-icons/lu";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const [enteredPassword, setEnteredPassword] = useState({ password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  const { login, logout, isLoggingIn, authUser } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    login(enteredPassword);
    setEnteredPassword("");
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textAlign={"center"}
          fontFamily={"Georgia"}
        >
          <Link to={"/"}>My Cookbook</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          {!authUser && (
            <HStack spacing={2} alignItems={"center"}>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={enteredPassword.password}
                onChange={(e) =>
                  setEnteredPassword({
                    ...enteredPassword,
                    password: e.target.value,
                  })
                }
              />
              <Button onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <LuEye size={30} />
                ) : (
                  <LuEyeOff size={30} />
                )}
              </Button>
              <Button onClick={handleLogin}>Log In</Button>
            </HStack>
          )}

          {authUser && <Button onClick={handleLogout}>Log Out</Button>}

          {authUser && (
            <Link to={"/create"}>
              <Button>
                <PlusSquareIcon fontSize={20} />
              </Button>
            </Link>
          )}

          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
