const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    //who is following
    follower: String,
    //kon follow ho raha h
    followee: String,
  },
  { timestamps: true },
);

followSchema.index({follower:1,followee:1},{unique:true})

const followModel = mongoose.model("follows",followSchema)

module.exports = followModel
