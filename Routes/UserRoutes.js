const express = require("express");
const router = express.Router();
const {
  authUser,
  registerUser,
  searchUser,
} = require("../Controller/UserController");
const { protect } = require("../Middleware/authMiddleware");
router.route("/login").post(authUser);
router.route("/signup").post(registerUser);
router.route("/searchUsers").post(protect, searchUser);
module.exports = router;
