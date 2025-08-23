import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.get("/recipes", (req, res) => {
  res.send("Here are the recipes");
});

app.post("/recipes", async (req, res) => {
  const recipe = req.body;

  if (!recipe.name || !recipe.ingredients || !recipe.instructions) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
});

app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});
