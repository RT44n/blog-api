const mongoose = require("mongoose");

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  text: { type: String, required: true },
  status: { type: String, required: true, enum: ["Public", "Private"] },
  comments: { type: Schema.Types.ObjectId, ref: "Comments" },
});

module.exports = mongoose.model("Post", PostSchema);
