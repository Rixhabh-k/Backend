const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: [true,"user alreday exists"]
    },
    password:{
        type: String,
        required: true
    }
})

const userModel = mongoose.model("newUsers",userSchema)

module.exports = userModel