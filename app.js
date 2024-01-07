const http = require("http");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();


app.use((req, res, next) => {
  console.log("I am in the next middleware");
  res.send("<div>Hello world</div>");
});

// const server = http.createServer(app);

// server.listen(3001);
app.listen(3001);
