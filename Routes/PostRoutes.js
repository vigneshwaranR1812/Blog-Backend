const express = require("express");
const router = express.Router();

const {
  getAllOwnPost,
  getCountAllOwnPost,
  createPost,
  updatePostById,
  getPostById,
  deletePostById,
} = require("../Controller/PostController");
const { protect } = require("../Middleware/authMiddleware");
const multer = require("multer");
const { storage, fileFilter } = require("../Util/imageProcessing");
let upload = multer({ storage, fileFilter });
router.route("/getAllPost").get(protect, getAllOwnPost);
router.route("/getAllPostCount").get(protect, getCountAllOwnPost);
router.route("/createPost").post(protect, upload.single("photo"), createPost);
router
  .route("/:postId")
  .put(protect, upload.single("photo"), updatePostById)
  .get(protect, getPostById)
  .delete(protect, deletePostById);

module.exports = router;
