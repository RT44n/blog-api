const express = require("express");
const router = express.Router();

const post_controller = require("../controllers/postController");

// Example route
router.get("/posts", post_controller.posts);

module.exports = router;
