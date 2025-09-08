import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dishType: {
      type: String,
      required: false,
    },
    time: {
      type: String,
      required: false,
    },
    servings: {
      type: String,
      required: false,
    },
    ingredients: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    notes: {
      type: String,
      required: false,
    },
    sourceName: {
      type: String,
      required: false,
    },
    source: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
