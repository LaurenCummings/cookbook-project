import { Box, Container, VStack, Heading, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const RecipePage = () => {
  const recipe = useLocation().state;
  console.log(recipe);
  return (
    <Box maxW={"lg"}>
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
