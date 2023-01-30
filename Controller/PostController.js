const Post = require("../Models/Post");
const asyncHandler = require("express-async-handler");

// @desc    get all the post based on userId
// @route   GET /api/post/getAllPost
// @access  Protected

const getAllOwnPost = asyncHandler(async (req, res) => {
  if (req.user) {
    const { _id } = req.user;
    const userPosts = await Post.find({ userID: _id });
    if (userPosts.length == 0) {
      res.status(200).json({ msg: "No post Created Yet!" });
    } else if (userPosts.length > 0) {
      res.status(200).json(userPosts);
    } else {
      res.status(404);
      throw new Error("Error Occurred! Try Again Later!");
    }
  }
});
// @desc    Count of all the post based on userId
// @route   GET /api/post/getAllPostCount
// @access  Protected

const getCountAllOwnPost = asyncHandler(async (req, res) => {
  if (req.user) {
    const { _id } = req.user;
    const count = await Post.find({ userID: _id });
    if (count) {
      res.status(200).json({ count: count.length });
    } else {
      res.status(200).json({ count: 0 });
    }
  }
});
// @desc    Get Post Based on postId
// @route   GET /api/post/:postID
// @access  Protected

const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404);
    throw new Error("The Post is not Available");
  }
});

// @desc    Create Post
// @route   POST /api/post/createPost
// @access  Protected

const createPost = asyncHandler(async (req, res) => {
  const { postTitle, postDescription } = req.body;
  const postImage = req.file.filename;
  const { _id } = req.user;
  const post = await Post.create({
    userID: _id,
    postTitle,
    postDescription,
    postImage,
  });
  if (post) {
    //{ msg: "Successfully Created the post" }
    res.status(200).json(post);
  } else {
    res.status(404);
    throw new Error("Error Occurred! Try Again Later!");
  }
});
// @desc    Update Post Based on postId
// @route   PUT /api/post/:postID
// @access  Protected

const updatePostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId);
  const { postTitle, postDescription } = req.body;
  const postImage = req.file ? req.file.filename : null;
  if (post) {
    post.postTitle = postTitle;
    post.postDescription = postDescription;
    if (postImage != null) post.postImage = postImage;
    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } else {
    res.status(404);
    throw new Error("The Post is not Available");
  }
});

// @desc    Delete Post Based on postId
// @route   DELETE /api/post/:postID
// @access  Protected

const deletePostById = asyncHandler(async (req, res) => {
  const product = await Post.findById(req.params.postId);
  if (product) {
    await product.remove();
    res.json({ msg: "Post removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

module.exports = {
  getAllOwnPost,
  getCountAllOwnPost,
  createPost,
  updatePostById,
  getPostById,
  deletePostById,
};
