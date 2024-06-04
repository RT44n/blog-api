const express = require("express");
const router = express.Router();

const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");
const user_controller = require("../controllers/userController");
const auth_controller = require("../controllers/authController");

router.get("/posts", post_controller.getPosts);

router.get("/posts/:id", post_controller.getPostDetail);

router.post("/posts", post_controller.postPosts);

router.put("/posts/:id", post_controller.putPosts);

router.delete("/posts/:id", post_controller.deletePosts);

router.get("/comments", comment_controller.getComments);

router.post("/comments", comment_controller.postComments);

router.put("/comments/:id", comment_controller.putComments);

router.delete("/comments/:id", comment_controller.deleteComments);

router.get("/users", user_controller.getUsers);

router.post("/auth/signup", auth_controller.signup);

router.post("/auth/signin", auth_controller.signin);

//router.put("/users/:id", user_controller.putUsers);

//router.delete("/users/:id", user_controller.deleteUsers);

module.exports = router;
