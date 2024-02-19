const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

// /admin/edit-product/:productId => GET
router.get("/edit-product/:productId", adminController.getEditProduct);

// /admin/edit-product/:productId => POST
router.post("/edit-product/:productId", adminController.postEditProduct);

// /admin/delete-product/:productId => POST
router.post("/delete-product/:productId", adminController.postDeleteProduct);


// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);

// /admin/products => GET
router.get("/products", adminController.getProducts);


// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);

module.exports = router;
