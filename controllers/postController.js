const asyncHandler = require("express-async-handler");
const Post = require("../models/post");
const User = require("../models/user"); // Import User model
const Comment = require("../models/comment"); // Import Comment model

exports.getPosts = asyncHandler(async (req, res, next) => {
  // Find all posts and populate 'author' and 'comments'
  const allPosts = await Post.find({})
    .populate("author", "username")
    .populate({
      path: "comments",
      populate: {
        path: "author",
        select: "username",
      },
    })
    .exec();

  // Send the response as JSON
  res.json(allPosts);
});

exports.postPosts = asyncHandler(async (req, res, next) => {
  res.json({ message: "yet to be implemented" });
});

exports.putPosts = asyncHandler(async (req, res, next) => {
  res.json({ message: "yet to be implemented" });
});

exports.deletePosts = asyncHandler(async (req, res, next) => {
  res.json({ message: "yet to be implemented" });
});
