const express = require("express");
const recipeRouter = require("./routes/recipe.routes") 
const cors = require("cors")

const app = express();

//middlewares
app.use(express.json())
app.use(cors())

// api's
app.use("/api/recipe",recipeRouter)
app.use("/api/recipe",recipeRouter)
app.use("/api/recipe",recipeRouter)

module.exports = app;
