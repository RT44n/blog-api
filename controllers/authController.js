const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.signup = asyncHandler(async (req, res, next) => {
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
