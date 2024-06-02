const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.getUsers = asyncHandler(async (req, res, next) => {
  res.json({ message: "yet to be implemented" });
});

exports.postUsers = asyncHandler(async (req, res, next) => {
  res.json({ message: "yet to be implemented" });
});

exports.putUsers = asyncHandler(async (req, res, next) => {
  res.json({ message: "yet to be implemented" });
});

exports.deleteUsers = asyncHandler(async (req, res, next) => {
  res.json({ message: "yet to be implemented" });
});
