import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Box minH={"100vh"}>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Box>
  );
}

export default App;
