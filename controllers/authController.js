const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Import the configured passport strategies
require("../config/passport");

exports.signup = async (req, res, next) => {
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
};

exports.signin = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: "Login failed" });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }

      // Generate a JWT token
      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Send the token to the client
      return res.json({
        message: "Signin successful!",
        token,
        user: user.username,
      });
    });
  })(req, res);
};
