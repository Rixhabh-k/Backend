const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer  = require('multer')
const upload = multer({storage:multer.memoryStorage()})
const verifyUser = require("../middlewares/auth.middleware")



//apis
postRouter.post("/",upload.single("image"),verifyUser,postController.createPostController) 
postRouter.get("/",verifyUser,postController.getPostController) 
postRouter.get("/details/:postId",verifyUser,postController.getPostDetailsController) 

module.exports = postRouter