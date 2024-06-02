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
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      firstname: req.body.firstname,
      password: hashedPassword,
    });
    const result = await user.save();
    res.json({ message: "Success!" });
  } catch (err) {
    return next(err);
  }
});

exports.putUsers = asyncHandler(async (req, res, next) => {
  res.json({ message: "yet to be implemented" });
});

exports.deleteUsers = asyncHandler(async (req, res, next) => {
  res.json({ message: "yet to be implemented" });
});
