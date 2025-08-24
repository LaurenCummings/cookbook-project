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

export const createRecipe = async (req, res) => {
  const recipe = req.body;

  if (!recipe.name || !recipe.ingredients || !recipe.instructions) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newRecipe = new Recipe(recipe);

  try {
    await newRecipe.save();
    res.status(201).json({ success: true, data: newRecipe });
  } catch (error) {
    console.error("Error in Create recipe:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
