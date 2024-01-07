const express = require("express");
const path = require("path");

const rootDir = require("../utils/path");

const shop = express.Router();
console.log('path', rootDir);

shop.use("/add-product", (req, res) => {
  res.sendFile(path.join(__dirname,'..', "views", "shop.html"));
});

module.exports = shop;
