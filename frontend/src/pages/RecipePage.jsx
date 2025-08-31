import { Container, VStack, Heading } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const RecipePage = () => {
  const recipe = useLocation().state;
  console.log(recipe);
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"xl"} textAlign={"center"} mb={8}>
          {recipe.name}
        </Heading>
        <Container>
          {recipe.ingredients.split("\n").map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </Container>
      </VStack>
    </Container>
  );
};

export default RecipePage;
