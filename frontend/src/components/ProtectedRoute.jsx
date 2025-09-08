import { Navigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const ProtectedRoute = ({ children, isAuthenticated }) => {
  const toast = useToast();

  if (!isAuthenticated) {
    toast.closeAll();
    toast({
      title: "Error",
      description: "You must be logged in to create recipes",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
