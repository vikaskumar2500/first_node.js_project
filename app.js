const http = require("http");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(shopRoutes);
app.use(adminRoutes);

// page not found handling
app.use((res) => {
  res.status(404).send("<div>Page Not Found</div>");
});

app.listen(3001);
