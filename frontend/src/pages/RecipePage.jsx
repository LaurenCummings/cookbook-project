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

const RecipePage = () => {
  const recipe = useLocation().state;
  console.log(recipe);
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
