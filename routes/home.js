const express = require("express");

const home = require("../controllers/home");
const router = express.Router();

router.post("/delete-comments/:commentId", home.deleteCommentController);
router.post("/add-comment", home.addCommentController);
router.post("/add-blog", home.addBlogController);

router.get("/", home.homeController);

module.exports = router;
