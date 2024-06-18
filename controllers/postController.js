const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const mongoose = require("mongoose");

//GET ALL BLOG POSTS
exports.getPosts = asyncHandler(async (req, res, next) => {
  // Find all posts and populate 'author' and 'comments'
  const allPosts = await Post.find({}).populate("author", "username").exec();

  res.json(allPosts);
});

//GET A SINGLE POST
exports.getPostDetail = asyncHandler(async (req, res, next) => {
  console.log(req.params);
  try {
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      const error = new Error("Invalid post ID");
      error.status = 400;
      return next(error);
    }

    const post = await Post.findById(postId)
      .populate("author", "username")
      .exec();

    if (!post) {
      const error = new Error("No post found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
});

//FIND POSTS OF A SPECIFIC USER
exports.getUserPosts = asyncHandler(async (req, res, next) => {
  try {
    const user = req.user;

    const posts = await Post.find({ author: user })
      .populate("author", "username")
      .exec();

    if (!posts.length) {
      const error = new Error("No posts found");
      error.status = 404;
      return next(error);
    }
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

//POST A NEW BLOG POST
exports.postPosts = asyncHandler(async (req, res, next) => {
  try {
    const post = new Post({
      title: req.body.title,
      author: req.user.id,
      date: new Date(),
      text: req.body.text,
      status: req.body.status,
    });

    await post.save();
    res.status(201).json({ message: "success", postId: post._id });
  } catch (error) {
    next(error);
  }
});

//UPDATE A SINGLE BLOG POST
exports.putPosts = asyncHandler(async (req, res, next) => {
  try {
    const postId = req.params.id;
    const updatedPost = {
      title: req.body.title,
      author: req.user.id,
      date: new Date(),
      text: req.body.text,
      status: req.body.status,
    };

    const post = await Post.findByIdAndUpdate(postId, updatedPost, {
      new: true,
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "success", post });
  } catch (error) {
    next(error);
  }
});

//DELETE A SINGLE BLOG POST
exports.deletePosts = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(userId);

    const post = await Post.findById(req.params.id).exec();

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (String(post.user._id) !== String(userId)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({ message: "Successfully deleted" });
  } catch (err) {
    next(err);
  }
});
