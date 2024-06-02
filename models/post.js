const mongoose = require("mongoose");

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now, required: true },
  text: { type: String, required: true },
  status: { type: String, required: true, enum: ["Public", "Private"] },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

PostSchema.virtual("url").get(function () {
  return `/api/posts/${this._id}`;
});

module.exports = mongoose.model("Post", PostSchema);
