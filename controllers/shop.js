const Product = require("../models/product");
const Cart = require("../models/cart");
const db = require("../util/db");

exports.getProducts = async (req, res, next) => {
  const result = await db.execute("select * from Products");
  const data = result[0];

  res.render("shop/product-list", {
    prods: data,
    pageTitle: "All Products",
    path: "/products",
  });
  // Product.fetchAll((products) => {
  //   res.render("shop/product-list", {
  //     prods: products,
  //     pageTitle: "All Products",
  //     path: "/products",
  //   });
  // });
};

exports.getProduct = async (req, res, next) => {
  const productId = req.params.productId;
  console.log(productId);
  const result = await db.execute("select * from Products where id=?", [
    productId,
  ]);
  const product = result[0][0];
  res.render("shop/product-detail", {
    pageTitle: "Product | Details",
    path: "/products",
    product,
  });
  // Product.findProductById(productId, (product) => {
  //   res.render("shop/product-detail", {
  //     pageTitle: "Product | Details",
  //     path: "/products",
  //     product,
  //   });
  // });
};

exports.getIndex = async (req, res, next) => {
  const result = await db.execute("select * from Products");
  const data = result[0];
  res.render("shop/index", {
    prods: data,
    pageTitle: "Shop",
    path: "/",
  });
  // Product.fetchAll((products) => {
  //   res.render("shop/index", {
  //     prods: products,
  //     pageTitle: "Shop",
  //     path: "/",
  //   });
  // });
};

exports.getCart = async (req, res, next) => {
  const result = await db.execute("select * from cart");
  const data = result[0];
  const totalPrice = data.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
    carts: data,
    totalPrice: totalPrice,
  });
  // Cart.getAllCart((cartData) => {
  //   res.render("shop/cart", {
  //     path: "/cart",
  //     pageTitle: "Your Cart",
  //     carts: cartData.carts,
  //     totalPrice: cartData.totalPrice,
  //   });
  // });
};

exports.postCart = async (req, res, next) => {
  const encodedProduct = req.body.product;
  const product = JSON.parse(encodedProduct);
  const result = await db.execute("select * from cart where productId=?", [
    product.id,
  ]);

  if (result[0].length===0) {
    await db.execute(
      "INSERT INTO cart (productId, title, price, description, imageUrl, quantity) VALUES(?,?,?,?,?,?)",
      [
        product.id,
        product.title,
        product.price,
        product.description,
        product.imageUrl,
        1,
      ]
    );
  } else {
    db.execute("update cart set quantity = quantity+? where productId=?", [
      1,
      product.id,
    ]);
  }
  // const cart = result[0][0];
  // Product.fetchAll((products) => {
  //   const product = products.find((prod) => prod.id == productId);
  //   Cart.addToCart(product.id, product.price);
  // });
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
