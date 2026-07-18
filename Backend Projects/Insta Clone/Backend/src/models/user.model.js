const mongoose = require("mongoose")
const { settings } = require("../app")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true,"username is reguired"],
        unique: [true,"username alreday exist" ]
    },
    email:{
        type: String,
        required: [true,"email is required"],
        unique: [true,"emial alreday exist"]
    },
    password:{
        type: String,
        required: [true,"password is required"]
    },
    bio:{
        type:String,
    },
    profile_Image: {
        type: String,
        default: "https://ik.imagekit.io/rixhabh1/userImage.png"
    }

})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel