console.log(
  'This script populates some test users, posts, and comments to your database. Specified database as argument - e.g.: node populateDB "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const mongoose = require("mongoose");
const User = require("./models/user");
const Post = require("./models/post");
const Comment = require("./models/comment");

const users = [];
const posts = [];
const comments = [];

mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createUsers();
  await createPosts();
  await createComments();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function userCreate(index, username, firstname, password) {
  const user = new User({ username, firstname, password });
  await user.save();
  users[index] = user;
  console.log(`Added user: ${username}`);
}

async function postCreate(index, title, author, date, text, status, comments) {
  const postDetail = {
    title,
    author,
    date,
    text,
    status,
  };
  if (comments) postDetail.comments = comments;

  const post = new Post(postDetail);
  await post.save();
  posts[index] = post;
  console.log(`Added post: ${title}`);
}

async function commentCreate(index, author, text, date) {
  const commentDetail = {
    author,
    text,
    date,
  };

  const comment = new Comment(commentDetail);
  await comment.save();
  comments[index] = comment;
  console.log(`Added comment: ${text}`);
}

async function createUsers() {
  console.log("Adding users");
  await Promise.all([
    userCreate(0, "cooluser1", "Cool", "password1"),
    userCreate(1, "cooluser2", "Cooler", "password2"),
    userCreate(2, "cooluser3", "Coolest", "password3"),
  ]);
}

async function createPosts() {
  console.log("Adding posts");
  await Promise.all([
    postCreate(
      0,
      "First Post",
      users[0]._id,
      new Date(),
      "This is the first post.",
      "Public",
      []
    ),
    postCreate(
      1,
      "Second Post",
      users[1]._id,
      new Date(),
      "This is the second post.",
      "Private",
      []
    ),
    postCreate(
      2,
      "Third Post",
      users[2]._id,
      new Date(),
      "This is the third post.",
      "Public",
      []
    ),
  ]);
}

async function createComments() {
  console.log("Adding comments");
  await Promise.all([
    commentCreate(0, users[0]._id, "Great post!", new Date()),
    commentCreate(1, users[1]._id, "Interesting read.", new Date()),
    commentCreate(2, users[2]._id, "Thanks for sharing!", new Date()),
  ]);

  // Update posts with comments
  posts[0].comments = [comments[0]._id, comments[1]._id];
  posts[1].comments = [comments[2]._id];
  await posts[0].save();
  await posts[1].save();
  console.log("Updated posts with comments");
}
