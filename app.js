const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/db");
const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const { Products, Carts } = require("./models/schema");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use(errorController.get404);

Products.hasMany(Carts, {
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "productId",
  targetKey: "id",
  foreignKeyConstraint: true,
});
Carts.belongsTo(Products);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((e) => console.log(e));
