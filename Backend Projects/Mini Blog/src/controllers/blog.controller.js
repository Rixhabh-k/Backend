const blogModel = require("../models/blog.model")
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});


const createBlogController = async(req,res)=>{

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),"file"),
        fileName: "blog-"+Date.now(),
        folder: "/blogs"
    })

   const blog = await blogModel.create({
    title: req.body.title,
    description: req.body.description,
    blogImg: file.url,
    user: req.user.id
   }) 

   res.status(200).json({
    message: "blog created successfully"
   })
}


module.exports = {
    createBlogController
}