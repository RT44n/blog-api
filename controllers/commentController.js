const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Comment = require("../models/comment");
const Post = require("../models/post"); // Fix typo here

// Get comments for a specific post
exports.getPostComments = asyncHandler(async (req, res, next) => {
  try {
    const postId = req.params.id;

    const comments = await Comment.find({ post: postId })
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

// Create a new comment
exports.postComments = [
  // Validation rules
  body("postId").notEmpty().withMessage("Post ID is required"),
  body("text").notEmpty().withMessage("Text is required"),

  // Request handler
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { postId, text } = req.body;

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("Post not found");
      error.status = 404;
      return next(error);
    }

    // Create and save the comment
    const comment = new Comment({
      post: postId,
      author: req.user.id,
      text: text,
    });

    await comment.save();

    res.status(201).json(comment);
  }),
];

// Update a comment (placeholder)
exports.putComments = asyncHandler(async (req, res, next) => {
  res.json({
    message: "Update comment functionality is yet to be implemented",
  });
});

// Delete a comment (placeholder)
exports.deleteComments = asyncHandler(async (req, res, next) => {
  res.json({
    message: "Delete comment functionality is yet to be implemented",
  });
});
