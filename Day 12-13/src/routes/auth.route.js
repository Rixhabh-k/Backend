const express = require("express");
const userModel = require("../models/user.model");
const JWT = require("jsonwebtoken");
const crypto = require("crypto");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserExistWithEmail = await userModel.findOne({ email });

  if (isUserExistWithEmail) {
    return res.status(400).json({
      message: "user with this email already exists.",
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex");

  const user = await userModel.create({
    name,
    email,
    password: hash,
  });

  const token = JWT.sign(
    { id: user._id, name: user.name },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(200).json({
    message: "User registred successfully",
    token,
  });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    res.status(401).json({
      message: "user does not exist with this email",
    });
  }

  const isPasswordMatch =
    user.password === crypto.createHash("md5").update(password).digest("hex");

  if (!isPasswordMatch) {
    res.status(401).json({
      message: "email or password is incorrect",
    });
  }

  const token = JWT.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );


  res.status(201).json({
    message: "user logged in",
    user,
    token
  })

});

module.exports = authRouter;
