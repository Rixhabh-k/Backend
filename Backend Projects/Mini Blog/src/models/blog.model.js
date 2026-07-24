const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Blog title is required"],
  },
  description: {
    type: String,
    required: [true, "Blog description is required"],
  },
  blogImg:{
    type: String,
    required: [true, "Blog image is required"]
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"user"
  }
});

const blogModel = mongoose.model("blog",blogSchema)

module.exports = blogModel
