import { Container, Text, VStack, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecipeStore } from "../store/recipe";
import RecipeCard from "../components/RecipeCard";

const HomePage = () => {
  const { fetchRecipes, recipes } = useRecipeStore();

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);
  console.log("recipes", recipes);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
          mt={10}
        >
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </SimpleGrid>

        {recipes.length == 0 && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            No Recipes Found{" "}
            <Link to={"/create"}>
              <Text color="blue.500" _hover={{ textDecoration: "underline" }}>
                Create a Recipe
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
