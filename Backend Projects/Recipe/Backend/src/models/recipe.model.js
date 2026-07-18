const mongoose =  require("mongoose")

const recipeSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    prepTime:{
        type: Number,
        required: true
    },
    difficulty:{
         type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    ingredients:{
        type: [String],
        required: true
    },
    steps:{
        type: [String],
        required: true
    }
})

const recipeModel = mongoose.model("recipes",recipeSchema)

module.exports = recipeModel