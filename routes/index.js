const express = require("express");
const router = express.Router();

const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController"); // corrected line
const user_controller = require("../controllers/userController");

router.get("/posts", post_controller.getPosts);

router.post("/posts", post_controller.postPosts);

router.put("/posts", post_controller.putPosts);

router.delete("/posts", post_controller.deletePosts);

router.get("/comments", comment_controller.getComments);

router.post("/comments", comment_controller.postComments);

router.put("/comments", comment_controller.putComments);

router.delete("/comments", comment_controller.deleteComments);

router.get("/users", user_controller.getUsers);

router.post("/users", user_controller.postUsers);

router.put("/users", user_controller.putUsers);

router.delete("/users", user_controller.deleteUsers);

module.exports = router;
