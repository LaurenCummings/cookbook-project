import {
  Box,
  Button,
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
        <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme={"blue"} />
        <IconButton
          icon={<DeleteIcon />}
          onClick={() => handleDeleteRecipe(recipe._id)}
          colorScheme={"red"}
        />
      </HStack>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"lg"} textAlign={"center"}>
          {updatedRecipe.name}
        </Heading>
        <Container>
          <Heading as={"h3"} size={"md"} textAlign={"center"}>
            Ingredients
          </Heading>
          {updatedRecipe.ingredients.split("\n").map((item, index) => (
            <Text key={index} fontSize="sm" textAlign={"center"}>
              {item}
            </Text>
          ))}
          <Heading as={"h3"} size={"md"}>
            Instructions
          </Heading>
          {updatedRecipe.instructions.split("\n").map((item, index) => (
            <Text key={index} fontSize="md">
              {item}
            </Text>
          ))}
        </Container>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Recipe</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Recipe Name"
                name="name"
                value={updatedRecipe.name}
                onChange={(e) =>
                  setUpdatedRecipe({ ...updatedRecipe, name: e.target.value })
                }
              />
              <Textarea
                placeholder="Ingredients"
                name="ingredients"
                value={updatedRecipe.ingredients}
                onChange={(e) =>
                  setUpdatedRecipe({
                    ...updatedRecipe,
                    ingredients: e.target.value,
                  })
                }
              />
              <Textarea
                placeholder="Instructions"
                name="instructions"
                value={updatedRecipe.instructions}
                onChange={(e) =>
                  setUpdatedRecipe({
                    ...updatedRecipe,
                    instructions: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateRecipe(recipe._id, updatedRecipe)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default RecipePage;
