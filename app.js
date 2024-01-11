const http = require("http");

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const _404Controllers = require("./controllers/404");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "src")));

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const contactUsRoutes = require("./routes/contact-us");
const successRoutes = require("./routes/success");

app.use(successRoutes);
app.use(contactUsRoutes);
app.use(shopRoutes);
app.use(adminRoutes);

// page not found handling
app.use(_404Controllers);

app.listen(3000);
