const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.getComments = asyncHandler(async (req, res, next) => {
  res.json({ message: "yet to be implemented" });
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
