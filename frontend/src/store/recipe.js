import { create } from "zustand";

export const useRecipeStore = create((set) => ({
  recipes: [],
  setRecipes: (recipes) => set({ recipes }),
  createRecipe: async (newRecipe) => {
    if (!newRecipe.name || !newRecipe.ingredients || !newRecipe.instructions) {
      return { success: false, message: "Please fill in all required fields." };
    }
    const res = await fetch("/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    });
    const data = await res.json();
    set((state) => ({ recipes: [...state.recipes, data.data] }));
    return { success: true, message: "Recipe created successfully" };
  },
  fetchRecipes: async () => {
    const res = await fetch("/api/recipes");
    const data = await res.json();
    set({ recipes: data.data });
  },
}));
