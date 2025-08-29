import {
  Box,
  Heading,
  Text,
  HStack,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useRecipeStore } from "../store/recipe";

const RecipeCard = ({ recipe }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  return (
    <Box p={4} bg={bg}>
      <Heading as="h3" size="md" mb={2}>
        {recipe.name}
      </Heading>
      <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
        {recipe.ingredients}
      </Text>
      <HStack spacing={2}>
        <IconButton icon={<EditIcon />} colorScheme="blue" />
        <IconButton icon={<DeleteIcon />} colorScheme="red" />
      </HStack>
    </Box>
  );
};

export default RecipeCard;
