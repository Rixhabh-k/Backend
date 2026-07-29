const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

/**
 *
 * @API : /api/user/follow/:username
 * @Description : To follow a user
 */
const followUserController = async (req, res) => {
  // we need user who is logged in and who is trying to follow a user
  const followerUsername = req.user.username; //arpan    // this is the user who is trying to follow an another user so it is follower

  // we need a user who is going to be followed by the follower
  const followeeUsername = req.params.username; //Rishabh    // this is the user who will be followed by the follower

  // Check if user exist who is to be followed in our case check Rishabh exists or not ?
  const isUserExist = await userModel.findOne({
    username: followeeUsername,
  });

  //if user (Rishabh) does not exists
  if (!isUserExist) {
    return res.status(404).json({
      message: "The user you are trying to follow does not exists",
    });
  }

  //Check if the user alreday following the requested user (arpan has already followed rishabh ?)
  const isUserFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (isUserFollowing) {
    // if it cames true then
    return res.status(209).json({
      message: `You are already following ${followeeUsername}`,
    });
  }

  // Check if user is requesting to follow itself (arpan is trying to follow arpan ?)
  if (followerUsername == isUserExist.username) {
    //if true
    return res.status(409).json({
      message: "You cannot follow yourself",
    });
  }

  const follewRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });

  res.status(200).json({
    message: `You are now following ${followeeUsername}`,
  });
};


/**
 *
 * @API : /api/user/unfollow/:username
 * @Description : To unfollow a user
 */
const unfollowUserController = async (req, res) => {
  const followerUsername = req.user.username; //token user have logged in (in our case its arpan)
  const followeeUsername = req.params.username; //user for arpan is requesting -- (Rishabh)

  //Check weather the user exists or not whom a user reqesting to unfollow

  const isUserFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (followerUsername == followeeUsername) {
    //if true
    return res.status(409).json({
      message: "You cannot unfollow yourself",
    });
  }

  

  if(!isUserFollowing){
    return res.status(401).json({
      message: `You are not following ${followeeUsername}`
    })
  }

  await followModel.findByIdAndDelete(isUserFollowing._id)

  res.status(200).json({
    message: `You have unfollowed ${followeeUsername}`
  })

};



module.exports = {
  followUserController,
  unfollowUserController
};
