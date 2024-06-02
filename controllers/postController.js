const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");

//GET ALL BLOG POSTS
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

  res.json(allPosts);
});

//POST A NEW BLOG POST
exports.postPosts = asyncHandler(async (req, res, next) => {
  try {
    const post = new Post({
      title: req.body.title,
      author: req.body.user,
      date: new Date(),
      text: req.body.text,
      status: "Public",
    });

    await post.save();
    res.status(201).json({ message: "success", postId: post._id });
  } catch (error) {
    next(error);
  }
});

//UPDATE A SINGLE BLOG POST
exports.putPosts = asyncHandler(async (req, res, next) => {
  res.json({ message: "yet to be implemented" });
});

//DELETE A SINGLE BLOG POST
exports.deletePosts = asyncHandler(async (req, res, next) => {
  res.json({ message: "yet to be implemented" });
});
