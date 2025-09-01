import { Box, Heading, Text, Image, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Link to={`/recipePage/${recipe._id}`} state={recipe}>
      <Box
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        transition="all 0.3s"
        _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        bg={bg}
      >
        <Image
          src={recipe.image}
          alt={recipe.name}
          h={48}
          w="full"
          objectFit="cover"
        />
        <Box p={4} bg={bg}>
          <Heading as="h3" size="md" mb={2}>
            {recipe.name}
          </Heading>
        </Box>
      </Box>
    </Link>
  );
};

export default RecipeCard;
