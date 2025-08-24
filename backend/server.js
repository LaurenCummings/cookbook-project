import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import Recipe from "./models/recipe.model.js";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/api/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.status(200).json({ success: true, data: recipes });
  } catch (error) {
    console.log("error is fetching recipes:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.post("/api/recipes", async (req, res) => {
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

app.put("/api/recipes/:id", async (req, res) => {
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

app.delete("/api/recipes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Recipe.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Recipe deleted" });
  } catch (error) {
    console.error("error in deleting recipe:", error.message);
    res.status(404).json({ success: false, message: "Recipe not found" });
  }
});

app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});
