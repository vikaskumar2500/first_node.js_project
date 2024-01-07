const express = require("express");

const shop = express.Router();

shop.use("/add-product", (req, res) => {
  res.send(`
    <form action='/add-product' method="POST">
      <input id='product' name='product' type='text'/>
      <input id='id' name='id' type='number'/>
      <button type='submit'>Submit</button>
    </form>
  `);
  console.log("body", req.body);
});

module.exports = shop;
