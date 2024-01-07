const express = require("express");
const path = require("path");

const handler = express();

handler.get("/success", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "views", "success.html"));
});

module.exports = handler;
