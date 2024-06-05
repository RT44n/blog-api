const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Comment = require("../models/comment");

exports.getUserComments = asyncHandler(async (req, res, next) => {
  try {
    const user = req.params.id;

    const comments = await Comment.find({ author: user })
      .populate("author", "username")
      .exec();

    if (!comments) {
      const error = new Error("No comments found");
      error.status = 404;
      return next(error);
    }
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

exports.postComments = asyncHandler(async (req, res, next) => {
  res.json({ message: "yet to be implemented" });
});

exports.putComments = asyncHandler(async (req, res, next) => {
  res.json({ message: "yet to be implemented" });
});

exports.deleteComments = asyncHandler(async (req, res, next) => {
  res.json({ message: "yet to be implemented" });
});
