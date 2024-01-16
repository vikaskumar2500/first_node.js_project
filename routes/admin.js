const express = require("express");

const router = express.Router();
const { getProduct, postProduct } = require("../controllers/admin");

// /admin/add-product => GET
router.get("/add-product", getProduct);

// /admin/add-product => POST
router.post("/add-product", postProduct);

exports.routes = router;
