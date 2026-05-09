import { Container, Text, VStack, SimpleGrid, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecipeStore } from "../store/recipe";
import RecipeCard from "../components/RecipeCard";

const HomePage = () => {
  const { fetchRecipes, recipes } = useRecipeStore();
  const [category, setCategory] = useState("all");

  const filteredRecipes = category === "all" ? recipes : recipes.filter(recipe => recipe.dishType === category);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Select value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Select category">
          <option value="all">All</option>
          <option value="breakfast">Breakfast</option>
          <option value="dinner">Dinner</option>
          <option value="dessert">Dessert</option>
          <option value="bread">Bread</option>
          <option value="fillings">Pastry fillings and spreads</option>
          <option value="condiments">Condiments</option>
        </Select>
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
          {filteredRecipes.map((recipe) => (
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
