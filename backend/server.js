import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/recipes", (req, res) => {
  res.send("Here are the recipes");
});

app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
});
