const express = require("express");
const path = require("path");

const handler = express();

handler.get("/contact-us", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "views", "contact-us.html"));
});

handler.post("/contact-us", (req, res) => {
  res.redirect("/success");
});

module.exports = handler;
