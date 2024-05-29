const asyncHandler = require("express-async-handler");
const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");

exports.posts = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find({})
    .populate("author", "username")

    .exec();

  res.json(allPosts);
});
