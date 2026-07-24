const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const createPostController = async (req, res) => {
  

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "test",
    folder: "/InstaClone-posts",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id,
  });

  res.status(201).json({
    message: "post created successully",
    file,
  });
};

const getPostController = async (req,res)=>{
  

  const userId = req.user.id

  const post = await postModel.find({
    user: userId
  })

  res.status(201).json({
    message: "post fetched successfully",
    post
  })


}

const getPostDetailsController = async (req,res)=>{
  

  const userId = req.user.id
  const postId = req.params.postId

  const post = await postModel.findById(postId)

  if(!post){
    return res.status(404).json({
      message: "post not found"
    })
  }

  const isValidUser = post.user.toString() === userId

  if(!isValidUser){
    return res.status(409).json({
      message: "forbidden"
    })
  }

  res.status(201).json({
    message: "post details",
    post
  })

}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController
};
