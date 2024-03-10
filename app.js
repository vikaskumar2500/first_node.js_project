const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/db");
const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const homeRoutes = require("./routes/home");
const Blogs = require("./models/blogs");
const Comments = require("./models/comments");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(homeRoutes);

app.use(errorController.get404);

Blogs.hasMany(Comments, {
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "blogId",
  sourceKey: "id",
});
Comments.belongsTo(Blogs);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((e) => console.log(e));
