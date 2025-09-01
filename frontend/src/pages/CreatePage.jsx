import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  VStack,
  Heading,
  Box,
  useColorModeValue,
  Input,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useRecipeStore } from "../store/recipe";

const CreatePage = () => {
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
  });

  const navigate = useNavigate();

  const toast = useToast();
  const { createRecipe } = useRecipeStore();

  const handleAddRecipe = async () => {
    const { success, message } = await createRecipe(newRecipe);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      navigate("/");
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Recipe
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Recipe Name"
              name="name"
              value={newRecipe.name}
              onChange={(e) =>
                setNewRecipe({ ...newRecipe, name: e.target.value })
              }
            />
            <Textarea
              placeholder="Ingredients"
              name="ingredients"
              value={newRecipe.ingredients}
              onChange={(e) =>
                setNewRecipe({ ...newRecipe, ingredients: e.target.value })
              }
            />
            <Textarea
              placeholder="Instructions"
              name="instructions"
              value={newRecipe.instructions}
              onChange={(e) =>
                setNewRecipe({ ...newRecipe, instructions: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newRecipe.image}
              onChange={(e) =>
                setNewRecipe({ ...newRecipe, image: e.target.value })
              }
            />

            <Button colorScheme="blue" onClick={handleAddRecipe} w="full">
              Add Recipe
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
