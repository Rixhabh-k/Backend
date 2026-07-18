const express = require("express")
const recipeRouter = express.Router()
const recipeModel =  require("../models/recipe.model")

// create recipe api
recipeRouter.post("/create-recipe",async(req,res)=>{
    const {title,description,prepTime,difficulty,category,ingredients,steps} = req.body

    const recipe = await recipeModel.create({
        title,
        description,
        prepTime,
        difficulty,
        category,
        ingredients,
        steps
    })

    res.status(201).json({
        message:"recipe created",
        recipe
    })
})

recipeRouter.get("/get-recipe",async(req,res)=>{
    const recipe = await recipeModel.find()


    res.status(200).json({
        message: "recipe fetched",
        recipe 
    })

})

recipeRouter.delete("/delete-recipe/:recipeId",async(req,res)=>{
    const recipeId = req.params.recipeId
    const recipe = await recipeModel.findByIdAndDelete(recipeId)

    res.status(200).json({
        message: "recipe deleted"
    })
})

module.exports = recipeRouter