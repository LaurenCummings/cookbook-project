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
  Image,
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
import { useLocation, useNavigate } from "react-router-dom";
import { useRecipeStore } from "../store/recipe";
import { useState } from "react";
import DeletionModal from "../components/DeletionModal";

const RecipePage = ({ isAuthenticated }) => {
  const recipe = useLocation().state;
  const [updatedRecipe, setUpdatedRecipe] = useState(recipe);
  const { deleteRecipe, updateRecipe } = useRecipeStore();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deletionModalDisclosure = useDisclosure();

  const handleDeleteClick = () => {
    deletionModalDisclosure.onOpen();
  };

  const handleDeleteRecipe = async (rid) => {
    const { success, message } = await deleteRecipe(rid);
    deletionModalDisclosure.onClose();
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      navigate("/");
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
      {isAuthenticated && (
        <HStack spacing={2} justifyContent={"flex-end"}>
          <IconButton
            icon={<EditIcon />}
            onClick={onOpen}
            colorScheme={"green"}
          />
          <IconButton
            icon={<DeleteIcon />}
            onClick={handleDeleteClick}
            colorScheme={"red"}
          />
          <DeletionModal
            isOpen={deletionModalDisclosure.isOpen}
            onClose={deletionModalDisclosure.onClose}
            onConfirm={() => handleDeleteRecipe(recipe._id)}
          />
        </HStack>
      )}

      <VStack spacing={8}>
        <Heading as={"h1"} size={"lg"} textAlign={"center"}>
          {updatedRecipe.name}
        </Heading>
        <Image
          src={updatedRecipe.image}
          alt={updatedRecipe.name}
          h={80}
          w="full"
          objectFit="cover"
          borderRadius={10}
        />
        <Container>
          <Heading as={"h3"} size={"md"} textAlign={"center"} mb={3}>
            Ingredients
          </Heading>
          {updatedRecipe.ingredients.split("\n").map((item, index) => (
            <Text key={index} fontSize="sm" textAlign={"center"}>
              {item}
            </Text>
          ))}
          <Heading as={"h3"} size={"md"} mt={5} mb={3}>
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
              <Input
                placeholder="Dish Type"
                name="dishType"
                value={updatedRecipe.dishType}
                onChange={(e) =>
                  setUpdatedRecipe({
                    ...updatedRecipe,
                    dishType: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Time"
                name="time"
                value={updatedRecipe.time}
                onChange={(e) =>
                  setUpdatedRecipe({ ...updatedRecipe, time: e.target.value })
                }
              />
              <Input
                placeholder="Servings"
                name="servings"
                value={updatedRecipe.servings}
                onChange={(e) =>
                  setUpdatedRecipe({
                    ...updatedRecipe,
                    servings: e.target.value,
                  })
                }
              />
              <Textarea
                placeholder="Notes"
                name="notes"
                value={updatedRecipe.notes}
                onChange={(e) =>
                  setUpdatedRecipe({
                    ...updatedRecipe,
                    notes: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedRecipe.image}
                onChange={(e) =>
                  setUpdatedRecipe({ ...updatedRecipe, image: e.target.value })
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
