const mongoose = require("mongoose");

const { Schema } = mongoose;

const CommentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model("Comment", CommentSchema);
