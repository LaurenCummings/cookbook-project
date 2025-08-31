import { Container, VStack, Heading, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const RecipePage = () => {
  const recipe = useLocation().state;
  console.log(recipe);
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"lg"} textAlign={"center"} mb={8}>
          {recipe.name}
        </Heading>
        <Container>
          <Heading as={"h3"} size={"md"}>
            Ingredients
          </Heading>
          {recipe.ingredients.split("\n").map((item, index) => (
            <Text key={index} fontSize="sm">
              {item}
            </Text>
          ))}
        </Container>
      </VStack>
    </Container>
  );
};

export default RecipePage;
