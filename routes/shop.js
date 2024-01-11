const express = require("express");
const shopController = require('../controllers/shop')
const shop = express.Router();

shop.use("/add-product", shopController);

module.exports = shop;
