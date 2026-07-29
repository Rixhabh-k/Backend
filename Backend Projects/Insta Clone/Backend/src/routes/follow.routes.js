const express = require("express")
const verifyUser = require("../middlewares/auth.middleware")
const userController = require("../controllers/user.controller")

const followRouter = express.Router()

followRouter.post("/follow/:username",verifyUser,userController.followUserController)
followRouter.post("/unfollow/:username",verifyUser,userController.unfollowUserController)

module.exports = followRouter