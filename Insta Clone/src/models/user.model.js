const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "username already exist"],
        required: [true, "username is required"]
    },
    email: {
        type: String,
        unique: [true,"user with this email already exist"],
        required: [true, "username is required"]
    },
    password:{
        type: String,
        required: [true, "username is required"]
    },
    bio: String,
    profileImage:{
        type: String,
        default: "https://ik.imagekit.io/rixhabh/account-icon-user-icon-vector-graphics_292645-552.avif"
    }
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel 