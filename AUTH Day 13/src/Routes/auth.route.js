const express = require("express");
const userModel = require("../models/user.model");
const crypto = require("crypto");
const JWT = require("jsonwebtoken");

const authRouter = express.Router();

// register api
authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserExists = await userModel.findOne({ email });

  if (isUserExists) {
    res.status(409).json({
      messgae: "user already exist try diffrent email",
    });
  }

  const user = await userModel.create({
    name,
    email,
    password: crypto.createHash("md5").update(password).digest("hex"),
  });

  const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("jwt_token", token);

  res.status(201).json({
    messgae: "user created",
    user,
    token,
  });
});

//get me api
authRouter.get("/get-me", async (req, res) => {
  const token = req.cookies.jwt_token;

  const decode = JWT.verify(token, process.env.JWT_SECRET);

  console.log(decode);

  const user = await userModel.findById(decode.id);

  res.status(201).json({
    user,
  });
});

//login api
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const isUserExists = await userModel.findOne({email})

  if(!isUserExists){
    res.status(409).json({
        message: "user does not exixt"
    })
  }

  const hash = crypto.createHash("md5").update(password).digest("hex")

  const correctPassword = isUserExists.password === hash

  if(!correctPassword){
    res.status(401).json({
        message: "incorrect password"
    })
  }

  const token = JWT.sign({id:isUserExists._id},process.env.JWT_SECRET,{expiresIn:"1h"})

  res.cookie("jwt_token",token)

  res.status(201).json({
    message: "user logged in"
  })

});

module.exports = authRouter;
