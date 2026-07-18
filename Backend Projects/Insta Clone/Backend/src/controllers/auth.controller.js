const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");


const registerController= async(req, res)=>{
  const { username, email, password, bio, profile_Image } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist) {
    res.status(409).json({
      message:
        "user already exist" +
        (isUserAlreadyExist.email == email
          ? "email already exiist"
          : "username already exits"),
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");

  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profile_Image,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("toekn", token);

  res.status(201).json({
    message: "user registered successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profile_Image,
    },
  });
}

const loginController = async (req, res)=>{
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or:[
        {username:username},
        {email:email}
    ]
  })

  if(!user){
    res.status(404).json({
        message: "user not found"
    })
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex")

  const isPasswordValid = hash == user.password

  if(!isPasswordValid){
    res.status(401).json({
        message: "Incorrect password"
    })
  }

  const freshToken = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn:"1d"})

  res.cookie("token",freshToken)

  res.status(200).json({
    message: "user logged in successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profile_Image,
    },
  })

}


module.exports = {
    registerController,
    loginController
}
