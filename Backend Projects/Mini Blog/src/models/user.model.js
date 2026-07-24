const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Username is required"]
    },
    name:{
        type: String
    },
    bio:{
        type: String
    },
    email: {
        type: String,
        required: [true, "Emial is required"],
        unique: [true, "Email already exists"]
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    genres:{
        type: [String],
    },
    profileImg:{
        type: String,
        default: "https://ik.imagekit.io/rixhabh1/userImage.png"
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel