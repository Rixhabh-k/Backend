const express = require("express")
const multer = require("multer")
const upload = multer({storage: multer.memoryStorage()})
const authController = require("../controllers/auth.controller")
const verifyUser = require("../middlewares/auth.middleware")

const authRouter = express.Router()

//register user
authRouter.post("/register",authController.registerUserController)
authRouter.post("/login",authController.loginController)
authRouter.post("/create-profile",verifyUser,upload.single("profileImg"),authController.createProfileController)

module.exports = authRouter