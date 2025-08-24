import Recipe from "./models/recipe.model.js";

export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.status(200).json({ success: true, data: recipes });
  } catch (error) {
    console.log("error in fetching recipes:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
