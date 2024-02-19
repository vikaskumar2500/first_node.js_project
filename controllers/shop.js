const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  console.log(productId);
  Product.findProductById(productId, (product) => {
    res.render("shop/product-detail", {
      pageTitle: "Product | Details",
      path: "/products",
      product,
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getAllCart((cartData) => {
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      carts: cartData.carts,
      totalPrice: cartData.totalPrice,
    });
  });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  console.log("poduct id", productId);
  Product.fetchAll((products) => {
    const product = products.find((prod) => prod.id == productId);
    Cart.addToCart(product.id, product.price);
  });
  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

exports.getSuccess = (req, res, next) => {
  res.render("success", {
    pageTitle: "Success",
    path: "/success",
  });
};
