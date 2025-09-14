import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import RecipePage from "./pages/RecipePage";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/recipePage/:id" element={<RecipePage />} />
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
