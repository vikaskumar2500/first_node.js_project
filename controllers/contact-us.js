const path = require("path");



const getContact = (req, res) => {
  res.sendFile(path.join(__dirname, "../", "views", "contact-us.html"));
};

const postContact = (req, res) => {
  res.redirect("/success");
};

module.exports = { postContact, getContact };
