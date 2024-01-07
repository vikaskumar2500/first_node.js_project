const express = require("express");
const path = require("path");

const rootDir = require("../utils/path");

const admin = express.Router();

admin.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "admin.html"));
});

module.exports = admin;
