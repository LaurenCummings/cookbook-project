import express from "express";
import mongoose from "mongoose";
import Recipe from "./models/recipe.model.js";

const router = express.Router();

router.get("/", getRecipes);

router.post("/", async (req, res) => {
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
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const recipe = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Recipe Id" });
  }

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, recipe, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedRecipe });
  } catch (error) {
    res.status(404).json({ success: false, message: "Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Recipe.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Recipe deleted" });
  } catch (error) {
    console.error("error in deleting recipe:", error.message);
    res.status(404).json({ success: false, message: "Recipe not found" });
  }
});

export default router;
