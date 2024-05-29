const mongoose = require("mongoose");

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  text: { type: String, required: true },
  comments: { type: Schema.Types.ObjectId, red: "Comments" },
});

module.exports = mongoose.model("Post", PostSchema);
