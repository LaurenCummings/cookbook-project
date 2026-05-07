import { Container, Text, VStack, SimpleGrid, Select, createListCollection } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecipeStore } from "../store/recipe";
import RecipeCard from "../components/RecipeCard";

const categories = createListCollection({
  items: [
    { label: "Desserts", value: "desserts" },
    { label: "Breakfast", value: "breakfast" },
    { label: "Condiments", value: "condiments" },
    { label: "Dinner", value: "dinner" },
    { label: "Appetizer", value: "appetizer" },
  ],
})

const HomePage = () => {
  const { fetchRecipes, recipes } = useRecipeStore();

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Select.Root
          collection={categories}
          size="sm"
          width="320px"
        >
          <Select.HiddenSelect />
          <Select.Label>Filter by Category</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Select category" />  
            </Select.Trigger>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                { categories.items.map((category) => (
                  <Select.Item item={category} key={category.value}>
                    {category.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
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
