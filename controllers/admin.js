const Product = require("../models/product");
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

exports.getEditProduct = async (req, res, next) => {
  const productId = req.params.productId;

  const result = await db.execute("select * from Products where id=?", [
    productId,
  ]);
  const data = result[0][0];
  
  res.render("admin/edit-product", {
    pageTitle: "Edit products",
    path: "/admin/edit-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    product: data,
  });
  // Product.findProductById(productId, (product) => {
  //   res.render("admin/edit-product", {
  //     pageTitle: "Edit products",
  //     path: "/admin/edit-product",
  //     formsCSS: true,
  //     productCSS: true,
  //     activeAddProduct: true,
  //     product: product,
  //   });
  // });
};

exports.postEditProduct = async (req, res, next) => {
  const productId = req.params.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  await db.execute(
    "UPDATE Products set title=?, imageUrl=?, price=?, description=? where id=?",
    [title, imageUrl, price, description, productId]
  );

  await db.execute(
    "UPDATE cart set title=?, imageUrl=?, price=?, description=? where productId=?",
    [title, imageUrl, price, description, productId]
  );

  // const product = {
  //   id: productId,
  //   title: title,
  //   imageUrl: imageUrl,
  //   price: price,
  //   description: description,
  // };
  // console.log("product", product);
  // Product.editProduct(product);
  res.redirect("/admin/products");
};

exports.postDeleteProduct = async (req, res, next) => {
  const productId = req.params.productId;
  await db.execute("delete from Products where id = ?", [productId]);
  // Product.deleteProduct(productId);
  await db.execute("delete from cart where productId=?", [productId]);
  res.redirect("/admin/products");
};

exports.postAddProduct = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  await db.execute(
    "INSERT INTO Products (title, price, description, imageUrl) VALUES(?,?,?,?)",
    [title, price, description, imageUrl]
  );
  // const product = new Product(title, imageUrl, description, price);
  // product.save();
  res.redirect("/");
};

exports.getProducts = async (req, res, next) => {
  const result = await db.execute("select * from Products");
  const data = result[0];
  res.render("admin/products", {
    prods: data,
    pageTitle: "Admin Products",
    path: "/admin/products",
  });
  // Product.fetchAll((products) => {
  //   res.render("admin/products", {
  //     prods: products,
  //     pageTitle: "Admin Products",
  //     path: "/admin/products",
  //   });
  // });
};
