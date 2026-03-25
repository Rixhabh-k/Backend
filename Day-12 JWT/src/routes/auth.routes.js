const express = require("express");
const userModel = require("../models/user.model");
const JWT = require("jsonwebtoken");
const crypto = require("crypto")

const authRouter = express.Router();

//resgister api
authRouter.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User alreday exist with this email.",
    });
  }

  const hash = crypto.createHash("md5").update(password).digest('hex')

  const user = await userModel.create({
    email,
    name,
    password: hash,
  });

  const token = JWT.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "User created successfully",
    user,
    token,
  });
});

// login api
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({email})
  
  if(!user){
    return res.status(401).json({
      message: "User does not exist"
    })
  }

  const isPasswordMatch = user.password === crypto.createHash("md5").update(password).digest('hex')

  if(!isPasswordMatch){
    return res.status(401).json({
      message: "Invalid password"
    })
  }

  const token = JWT.sign({
    id: user._id,
  },process.env.JWT_SECRET)

  res.status(201).json({
    message: "user logged in",
    user,
    token
  })
});

module.exports = authRouter;
