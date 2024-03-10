const { Carts, Products } = require("../models/schema");
const db = require("../util/db");

exports.getProducts = async (req, res, next) => {
  try {
    const result = await Products.findAll();
    res.render("shop/product-list", {
      prods: result,
      pageTitle: "All Products",
      path: "/products",
    });
  } catch (e) {
    console.log(e);
  }
};

exports.getProduct = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const product = await Products.findByPk(productId);
    if (!product) throw new Error("failed to fetch product data");
    res.render("shop/product-detail", {
      pageTitle: "Product | Details",
      path: "/products",
      product,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.getIndex = async (req, res, next) => {
  try {
    const data = await Products.findAll();
    res.render("shop/index", {
      prods: data,
      pageTitle: "Shop",
      path: "/",
    });
  } catch (e) {
    console.log(e);
  }
};

exports.getCart = async (req, res, next) => {
  try {
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
  } catch (e) {
    console.log(e);
  }
};

exports.postCart = async (req, res, next) => {
  const encodedProduct = req.body.product;

  try {
    const product = JSON.parse(encodedProduct);
    const { id, price, title, description, imageUrl } = product;
    console.log("product id", id);
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
  } catch (e) {
    console.log(e);
  }
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
