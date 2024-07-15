const express = require("express");
const router = express.Router();
const passport = require("passport");

const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");
const user_controller = require("../controllers/userController");
const auth_controller = require("../controllers/authController");

router.get("/posts", post_controller.getPosts);

router.get(
  "/user/posts",
  passport.authenticate("jwt", { session: false }),
  post_controller.getUserPosts
);

router.get("/posts/:id", post_controller.getPostDetail);

router.post(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  post_controller.postPosts
);

router.put(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  post_controller.putPosts
);

router.delete(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  post_controller.deletePosts
);

router.get("user/:id/comments", comment_controller.getUserComments);

router.get("/posts/:id/comments", comment_controller.getPostComments);

router.post(
  "/posts/:id/comments",
  passport.authenticate("jwt", { session: false }),
  comment_controller.postComments
);

router.put(
  "/posts/:id/comments",
  passport.authenticate("jwt", { session: false }),
  comment_controller.putComments
);

router.delete(
  "/posts/:id/comments",
  passport.authenticate("jwt", { session: false }),
  comment_controller.deleteComments
);

router.get("/users", user_controller.getUsers);

router.post("/auth/signup", auth_controller.signup);

router.post("/auth/signin", auth_controller.signin);

// router.put("/users/:id", passport.authenticate("jwt", { session: false }), user_controller.putUsers);
// router.delete("/users/:id", passport.authenticate("jwt", { session: false }), user_controller.deleteUsers);

module.exports = router;
