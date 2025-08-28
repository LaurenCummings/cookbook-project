import { Box, Heading } from "@chakra-ui/react";

const RecipeCard = ({ recipe }) => {
  return (
    <Box p={4}>
      <Heading as="h3" size="md" mb={2}>
        {recipe.name}
      </Heading>
    </Box>
  );
};

export default RecipeCard;
