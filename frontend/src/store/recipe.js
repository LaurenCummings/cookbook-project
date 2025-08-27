import { create } from "zustand";

export const useRecipeStore = create((set) => ({
  recipes: [],
  setRecipes: (recipes) => set({ recipes }),
  createRecipe: async (newRecipe) => {
    if (!newRecipe.name || !newRecipe.ingredients || !newRecipe.instructions) {
      return { success: false, message: "Please fill in all required fields." };
    }
    const res = await fetch("http://localhost:5000/api/recipes");
  },
}));
