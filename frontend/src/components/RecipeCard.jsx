import { Box, Heading, Text, HStack, IconButton } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "react-icons";

const RecipeCard = ({ recipe }) => {
  return (
    <Box p={4}>
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
          onClick={() => handleDelete(recipe._id)}
        />
      </HStack>
    </Box>
  );
};

export default RecipeCard;
