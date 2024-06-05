const mongoose = require("mongoose");

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now, required: true },
  text: { type: String, required: true },
  status: { type: String, required: true, enum: ["Public", "Private"] },
  tags: {
    type: [String],
    enum: [
      "Artificial Intelligence",
      "Machine Learning",
      "Software Development",
      "Web Development",
      "Mobile Apps",
      "Cybersecurity",
      "Cloud Computing",
      "Blockchain",
      "IoT (Internet of Things)",
      "DevOps",
      "Programming Languages",
      "Tech News",
      "Startups",
    ],
  },
});

PostSchema.virtual("url").get(function () {
  return `/api/posts/${this._id}`;
});

module.exports = mongoose.model("Post", PostSchema);
