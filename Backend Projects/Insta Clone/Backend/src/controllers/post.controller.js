const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const {toFile} =  require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

const imagekit = new ImageKit({
     publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
})


const createPostController = async (req,res)=>{

    const token = req.cookies.token

    

    if(!token){
        return res.status(401).json({
            message: "token not found"
        })
    }

    let decode = null

    try {
        decode = jwt.verify(token,process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message: " user is unauthorized"
        })
    }

   const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer),'file'),
    fileName: "test",
    folder: "/InstaClone-posts"
   })

   

   const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user:decode.id
   })

   res.status(201).json({
    message: "post created successully",file
   })
}

module.exports = {
    createPostController
} 