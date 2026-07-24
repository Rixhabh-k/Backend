const express = require("express")
const multer = require("multer")
const uplaod = multer({storage: multer.memoryStorage()})
const verifyUser = require("../middlewares/auth.middleware")
const blogController = require("../controllers/blog.controller")

const blogRouter = express.Router()

//api's
blogRouter.post("/",verifyUser,uplaod.single("blogImg"),blogController.createBlogController)

module.exports = blogRouter