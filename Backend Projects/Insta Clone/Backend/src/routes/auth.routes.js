const express = require("express");
const authController = require("../controllers/auth.controller")

const authRouter = express.Router();

//user register API
authRouter.post("/register",authController.registerController);

//user login api
authRouter.post("/login",authController.loginController);

module.exports = authRouter;
