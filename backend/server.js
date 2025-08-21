import express from "express";

const app = express();

app.get("/api/recipes", (req, res) => {
    res.send("Here are the recipes");
});

app.listen(5001, () => {
    console.log("Server started on PORT: 5001");
})