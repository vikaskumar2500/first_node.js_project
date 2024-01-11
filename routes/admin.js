const express = require("express");
const path = require("path");
const adminController = require("../controllers/admin");

const admin = express.Router();

admin.get("/", adminController);

module.exports = admin;
