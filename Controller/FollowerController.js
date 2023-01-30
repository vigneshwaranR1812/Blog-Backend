const asyncHandler = require("express-async-handler");
const Followers = require("../Models/Followers");
const Post = require("../Models/Post");

// @desc    Add the follower
// @route   POST /api/follow/addFollower
// @access  Protected

const addFollower = asyncHandler(async (req, res) => {
  const { _id: userID } = req.user;
  console.log(userID);
  const { followingID } = req.body;
  const checkFollow = await Followers.find({ userID, followingID });
  console.log(checkFollow);
  if (checkFollow && checkFollow.length != 0) {
    res.status(400);
    throw new Error("Already you are following");
  } else {
    const follow = await Followers.create({ userID, followingID });
    res.status(200).json({ msg: "You are started to follow!" });
  }
});

// @desc    follower Count
// @route   GET /api/follow/followerCount
// @access  Protected
const followerCount = asyncHandler(async (req, res) => {
  const { _id: followingID } = req.user;
  const count = await Followers.find({ followingID }).count();
  if (count) {
    res.status(200).json({ count });
  } else {
    res.status(400);
    throw new Error("No Followers are available");
  }
});
// @desc    following Count
// @route   GET /api/follow/followingCount
// @access  Protected

const followingCount = asyncHandler(async (req, res) => {
  const { _id: userID } = req.user;
  const count = await Followers.find({ userID }).count();

  if (count) {
    res.status(200).json({ count });
  } else {
    res.status(400);
    throw new Error("No Followers are available");
  }
});

// @desc    get All Post Of Followers
// @route   GET /api/follow/getAllPost
// @access  Protected
const getAllPostOfFollowers = asyncHandler(async (req, res) => {
  const { _id: userID } = req.user;
  const followers = await Followers.find({ userID });
  let post = [];
  if (followers) {
    const data = followers.map(async (follow) => {
      const postOfFollower = await Post.find({
        userID: follow.followingID,
      });
      if (postOfFollower)
        postOfFollower.map((p) => {
          post.push(p);
        });
    });
    const dummy = await Promise.allSettled(data);
    post = post.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    res.status(200).json(post);
  } else {
    res.status(200);
    throw new Error("No Post are available");
  }
});

module.exports = {
  getAllPostOfFollowers,
  addFollower,
  followerCount,
  followingCount,
};
