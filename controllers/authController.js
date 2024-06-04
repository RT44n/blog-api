const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

exports.signin = asyncHandler(async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send the token to the client
    res.json({ message: "Signin successful!", token });
  } catch (err) {
    next(err);
  }
});
