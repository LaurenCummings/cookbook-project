import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import RecipePage from "./pages/RecipePage";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CreatePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recipePage/:id"
          element={<RecipePage isAuthenticated={isAuthenticated} />}
        />
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
