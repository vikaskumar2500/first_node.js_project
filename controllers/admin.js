const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.getEditProduct = (req, res, next) => {
  const params = req.params;
  Product.findProductById(params.productId, (product) => {
    res.render("admin/edit-product", {
      pageTitle: "Edit products",
      path: "/admin/edit-product",
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true,
      product: product,
    });
  });
};

exports.postEditProduct = async (req, res, next) => {
  const productId = req.params.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = {
    id: productId,
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description,
  };
  console.log("product", product);
  Product.editProduct(product);
  res.redirect("/admin/products");
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.deleteProduct(productId);
  res.redirect("/admin/products");
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
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

// exports.editProducts = (req, res, next) => {};
