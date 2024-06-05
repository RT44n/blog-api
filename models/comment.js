const mongoose = require("mongoose");

const { Schema } = mongoose;

const CommentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  post: { type: Schema.Types.ObjectId, ref: "Post" },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model("Comment", CommentSchema);
