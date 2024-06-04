const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.signup = asyncHandler(async (req, res, next) => {
  try {
    const { username, firstname, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      firstname,
      password: hashedPassword,
    });

    const result = await user.save();

    res.status(201).json({ message: "User created successfully!" });
  } catch (err) {
    next(err);
  }
});
