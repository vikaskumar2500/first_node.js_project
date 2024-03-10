const Blogs = require("../models/blogs");
const Comments = require("../models/comments");

exports.homeController = async (req, res, next) => {
  try {
    const blogs = await Blogs.findAll({
      include: Comments,
    });
    res.render("home", {
      pageTitle: "Home",
      path: "/",
      formsCSS: true,
      productCSS: true,
      blogs: blogs,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.addBlogController = async (req, res, next) => {
  const title = req.body.title;
  const author = req.body.author;
  const content = req.body.content;
  try {
    await Blogs.create({ title, author, content });
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
};

exports.addCommentController = async (req, res, next) => {
  const comment = req.body.comment;
  const blogId = req.body.blogId;
  try {
    await Comments.create({ comment, blogId });
    return res.redirect("/");
  } catch (e) {
    console.log(e);
  }
};

exports.deleteCommentController = async (req, res, next) => {
  const commentId = req.params.commentId;
  try {
    await Comments.destroy({
      where: {
        id: commentId,
      },
    });
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
};
