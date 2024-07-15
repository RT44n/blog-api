const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Comment = require("../models/comment");
const Post = require("..models/post");

exports.getUserComments = asyncHandler(async (req, res, next) => {
  try {
    const user = req.params.id;

    const comments = await Comment.find({ author: user })
      .populate("author", "username")
      .exec();

    if (!comments.length) {
      const error = new Error("No comments found");
      error.status = 404;
      return next(error);
    }
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

exports.getPostComments = asyncHandler(async (req, res, next) => {
  try {
    const post = req.params.id;

    const comments = await Comment.find({ post: post }).exec();

    if (!comments.length) {
      const error = new Error("No comments found");
      error.status = 404;
      return next(error);
    }
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

exports.postComments = [
  // Validation rules
  body("postId").notEmpty().withMessage("Post ID is required"),
  body("userId").notEmpty().withMessage("Author ID is required"),
  body("text").notEmpty().withMessage("Text is required"),

  // Request handler
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { postId, userId, text } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("Post not found");
      error.status = 404;
      return next(error);
    }

    const comment = new Comment({
      post: postId,
      author: userId,
      text: text,
    });

    await comment.save();

    res.status(201).json(comment);
  }),
];

exports.putComments = asyncHandler(async (req, res, next) => {
  res.json({ message: "yet to be implemented" });
});

exports.deleteComments = asyncHandler(async (req, res, next) => {
  res.json({ message: "yet to be implemented" });
});
