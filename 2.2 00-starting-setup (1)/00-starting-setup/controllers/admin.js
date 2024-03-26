const Product = require("../models/product");
const { createId } = require("@paralleldrive/cuid2");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const id = createId();
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(id, title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};

exports.getEditProduct = (req, res, next) => {
  const productId = req.params.productId;

  Product.findById(productId, (data) => {
    // console.log(data);
    res.render("admin/edit-product", {
      product: data,
      pageTitle: `Editing ${data?.id}`,
      path: "admin/edit-product",
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.params.productId;

  console.log("post ", productId);

  const id = productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(id, title, imageUrl, description, price);
  product.save();
  res.redirect("/admin/products");
};
