const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.getUsers = asyncHandler(async (req, res, next) => {
  try {
    const allUsers = await User.find({}).exec();

    res.json(allUsers);
  } catch (error) {
    next(error);
  }
});

exports.postUsers = asyncHandler(async (req, res, next) => {
  res.json({ message: "no response" });
});

exports.putUsers = asyncHandler(async (req, res, next) => {
  res.json({ message: "yet to be implemented" });
});

exports.deleteUsers = asyncHandler(async (req, res, next) => {
  res.json({ message: "yet to be implemented" });
});
