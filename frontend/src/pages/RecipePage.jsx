import {
  Box,
  Container,
  HStack,
  VStack,
  Heading,
  Text,
  IconButton,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";
import { useRecipeStore } from "../store/recipe";
import { useState } from "react";

const RecipePage = () => {
  const recipe = useLocation().state;
  const [updatedRecipe, setUpdatedRecipe] = useState(recipe);
  const { deleteRecipe, updateRecipe } = useRecipeStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteRecipe = async (rid) => {
    const { success, message } = await deleteRecipe(rid);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateRecipe = async (rid, updatedRecipe) => {
    const { success, message } = await updateRecipe(rid, updatedRecipe);
    onClose();
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Recipe updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW={"lg"} m={"auto"}>
      <HStack spacing={2} justifyContent={"flex-end"}>
        <IconButton icon={<EditIcon />} colorScheme={"blue"} />
        <IconButton icon={<DeleteIcon />} colorScheme={"red"} />
      </HStack>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"lg"} textAlign={"center"}>
          {recipe.name}
        </Heading>
        <Container>
          <Heading as={"h3"} size={"md"} textAlign={"center"}>
            Ingredients
          </Heading>
          {recipe.ingredients.split("\n").map((item, index) => (
            <Text key={index} fontSize="sm" textAlign={"center"}>
              {item}
            </Text>
          ))}
          {recipe.instructions.split("\n").map((item, index) => (
            <Text key={index} fontSize="md">
              {item}
            </Text>
          ))}
        </Container>
      </VStack>
    </Box>
  );
};

export default RecipePage;
