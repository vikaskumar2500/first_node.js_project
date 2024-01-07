const express = require('express');

const admin = express.Router();

admin.get('/', (req, res) => {
  console.log("I am in the next middleware");
  res.send("<div>Hello world</div>");
});

module.exports = admin;