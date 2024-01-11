const express = require("express");
const path = require("path");
const {
  getContact: getContactController,
  postContact: postContactController,
} = require("../controllers/contact-us");

const handler = express();

handler.get("/contact-us", getContactController);

handler.post("/contact-us", postContactController);

module.exports = handler;
