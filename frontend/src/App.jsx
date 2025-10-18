import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes, Navigate } from "react-router-dom";
import RecipePage from "./pages/RecipePage";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import { Spinner } from "@chakra-ui/icons";
import { Toaster } from "react-hot-toast";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) return <Spinner size="xl" />;

  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/create"
          element={authUser ? <CreatePage /> : <Navigate to="/" />}
        />
        <Route path="/recipePage/:id" element={<RecipePage />} />
      </Routes>
      <Footer />

      <Toaster />
    </Box>
  );
}

export default App;
