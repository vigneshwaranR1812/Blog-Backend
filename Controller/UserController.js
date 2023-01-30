// count of followers
// count of post
const asyncHandler = require("express-async-handler");
const User = require("../Models/User");
const generateToken = require("../Util/generateToken");
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res, next) => {
  const { userName, password } = req.body;
  const userDetails = await User.findOne({ userName });
  if (userDetails && (await userDetails.matchPassword(password))) {
    res.status(200).json({
      _id: userDetails._id,
      userName: userDetails.userName,
      token: generateToken(userDetails._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid username or password");
  }
});

// @desc    Register user & get token
// @route   POST /api/users/signup
// @access  Public

const registerUser = asyncHandler(async (req, res, next) => {
  const { userName, password } = req.body;
  const userDetails = await User.findOne({ userName });
  if (userDetails) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({ userName, password });
  if (user) {
    res.status(200).json({
      _id: user._id,
      userName: user.userName,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc    searching users from database
// @route   POST /api/users/searchUsers
// @access  Protected

const searchUser = asyncHandler(async (req, res) => {
  const { searchReq } = req.body;
  const userData = await User.find({
    userName: { $regex: ".*" + searchReq + ".*" },
  }).select("-password");
  if (userData.length == 0) {
    res.status(200).json({ data: "No User Available" });
  } else {
    res.status(200).json(userData);
  }
});

module.exports = { registerUser, authUser, searchUser };
