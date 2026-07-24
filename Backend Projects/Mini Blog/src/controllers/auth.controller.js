const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
const imageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")

const imagekit = new imageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });

const registerUserController = async (req, res) => {
  const { username, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist) {
    return res.status(400).json({
      message: "user already exist",
    });
  }

  const hash = await bycrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token);

  res.status(200).json({
    message: "user created successfully",
    user,
  });
};

const loginController = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [
      {
        username: username,
      },
      {
        email: email,
      },
    ],
  });

  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  const isPasswordValid = await bycrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "password is incorrect",
    });
  }

  const freshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", freshToken);

  res.status(201).json({
    message: "user logged in",
  });
};

const createProfileController = async (req, res) => {

 

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer),"file"),
    fileName: Date.now(),
    folder: "/blog-users"
  })

  

  const { name, bio, genres, profileImg } = req.body;

  const user = await userModel.findByIdAndUpdate(req.user.id, 
    {
    name,
    bio,
    genres,
    profileImg: file.url
  },
  {new: true}
);

  res.status(200).json({
    message: "everything gone fine",
    user
  });
};

module.exports = {
  registerUserController,
  loginController,
  createProfileController,
};
