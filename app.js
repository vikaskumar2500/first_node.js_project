const http = require("http");

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const rootDir = require("./utils/path");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const contactUsRoutes = require("./routes/contact-us");
const successRoutes = require("./routes/success");
console.log("path", rootDir);

app.use(successRoutes);
app.use(contactUsRoutes);
app.use(shopRoutes);
app.use(adminRoutes);

// page not found handling
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "..", "views", "404.html"));
});

app.listen(3001);
