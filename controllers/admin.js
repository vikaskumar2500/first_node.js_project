const { Products, Carts } = require("../models/schema");
const db = require("../util/db");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = await Products.create({
    title,
    price,
    description,
    imageUrl,
  });
  console.log(product);
  // await db.query(
  //   "INSERT INTO Products (title, price, description, imageUrl) VALUES(?,?,?,?)",
  //   [title, price, description, imageUrl]
  // );
  // // const product = new Product(title, imageUrl, description, price);
  // // product.save();
  res.redirect("/");
};

exports.getEditProduct = async (req, res, next) => {
  const productId = req.params.productId;
  const data = await Products.findOne({
    where: {
      id: productId,
    },
  });
  res.render("admin/edit-product", {
    pageTitle: "Edit products",
    path: "/admin/edit-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    product: data,
  });
};

exports.postEditProduct = async (req, res, next) => {
  const productId = req.params.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  await Products.update(
    { title, imageUrl, price, description },
    { where: { id: productId }, sideEffects: false, individualHooks: true }
  );
  await Carts.update(
    { title, imageUrl, price, description },
    { where: { productId } }
  );

  res.redirect("/admin/products");
};

exports.postDeleteProduct = async (req, res, next) => {
  const productId = req.params.productId;
  await Products.destroy({ where: { id: productId } });
  await Carts.destroy({ where: { productId } });
  res.redirect("/admin/products");
};

exports.getProducts = async (req, res, next) => {
  const result = await Products.findAll();
  res.render("admin/products", {
    prods: result,
    pageTitle: "Admin Products",
    path: "/admin/products",
  });
};
