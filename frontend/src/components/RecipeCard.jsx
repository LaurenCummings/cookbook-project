import {
  Box,
  Button,
  Heading,
  Text,
  HStack,
  VStack,
  IconButton,
  useColorModeValue,
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
import { useRecipeStore } from "../store/recipe";
import { useState } from "react";

const RecipeCard = ({ recipe }) => {
  const [updatedRecipe, setUpdatedRecipe] = useState(recipe);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

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
    await updateRecipe(rid, updatedRecipe);
    onClose();
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Box p={4} bg={bg}>
        <Heading as="h3" size="md" mb={2}>
          {recipe.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          {recipe.ingredients}
        </Text>
        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteRecipe(recipe._id)}
            colorScheme="red"
          />
        </HStack>
      </Box>

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
                  setUpdatedrecipe({
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

export default RecipeCard;
