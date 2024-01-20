const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addToCart(id, productPrice) {
    //all products
    fs.readFile(p, (err, data) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) cart = JSON.parse(data);

      const existingProductIndex = cart.products.findIndex(
        (product) => product.id == id
      );
      if (cart.products[existingProductIndex]) {
        cart.products[existingProductIndex].qty += 1;
      } else {
        cart.products = [...cart.products, { id, qty: 1 }];
      }
      cart.totalPrice += +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => console.log(err));
    });
  }
};
