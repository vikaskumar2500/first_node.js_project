const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");


const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const router = require("./routes/contact-us");
const { notFound } = require("./controllers/notFound");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


app.use("/admin", adminRoutes.routes);
app.use("/", router);
app.use(shopRoutes);

app.use(notFound);

app.listen(3000);
