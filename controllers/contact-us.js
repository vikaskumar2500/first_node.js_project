exports.getContact = (req, res, next) => {
  res.render("contact-us", {
    pageTitle: "Contact Us",
    path: "/contact-us",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postContact = (req, res, next) => {
  res.redirect("/success");
};
