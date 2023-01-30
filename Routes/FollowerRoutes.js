const express = require("express");
const router = express.Router();
const {
  getAllPostOfFollowers,
  addFollower,
  followerCount,
  followingCount,
} = require("../Controller/FollowerController");
const { protect } = require("../Middleware/authMiddleware");

router.route("/followingCount").get(protect, followingCount);
router.route("/followerCount").get(protect, followerCount);
router.route("/addFollower").post(protect, addFollower);
router.route("/getAllPost").get(protect, getAllPostOfFollowers);

module.exports = router;
