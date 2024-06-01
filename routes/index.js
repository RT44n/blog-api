const express = require("express");
const router = express.Router();

const post_controller = require("../controllers/postController");

// Example route
router.get("/posts", post_controller.getPosts);

router.post("/posts", post_controller.postPosts);

router.put("/posts", post_controller.putPosts);

router.delete("/posts", post_controller.deletePosts);

module.exports = router;
