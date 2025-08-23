import express from "express";
import dotenv from "dotenv";

dotenv.config();

app.get("/", (req, res) => {
  res.send("Server is ready");
});

const app = express();

app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
});
