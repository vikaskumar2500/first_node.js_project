const { Carts, Products } = require("../models/schema");
const db = require("../util/db");

exports.getProducts = async (req, res, next) => {
  const result = await Products.findAll();

  res.render("shop/product-list", {
    prods: result,
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
  const product = await Products.findOne({ where: { id: productId } });
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
  const result = await db.query("select * from Products");
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
  const result = await Carts.findAll();
  const totalPrice = result.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
    carts: result,
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
  const { id, price, title, description, imageUrl } = product;
  const result = await Carts.findOne({ where: { productId: id } });
  if (!result) {
    await Carts.create({
      productId: id,
      price,
      title,
      description,
      imageUrl,
      quantity: 1,
    });
  } else {
    await Carts.update(
      {
        quantity: result.quantity + 1,
      },
      {
        where: {
          productId: id,
        },
      }
    );
  }
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
