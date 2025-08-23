import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

console.log(process.env.MONGO_URI);

app.get("/recipes", (req, res) => {
  res.send("Here are the recipes");
});

app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
});
