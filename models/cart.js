const fs = require("fs");
const path = require("path");
const Product = require("./product");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addToCart = async (id, productPrice) => {
    try {
      let totalCart = JSON.parse(fs.readFileSync(p));
      const existingProductIndex = totalCart.carts.findIndex(
        (product) => product.id === id
      );
      if (existingProductIndex !== -1) {
        totalCart.carts[existingProductIndex].qty += 1;
      } else {
        const data = await new Promise((resolve, reject) => {
          Product.findProductById(id, (product) => {
            resolve(product);
          });
        });
        totalCart.carts = [...totalCart.carts, { ...data, qty: 1 }];
      }
      // console.log("total cart", totalCart);

      totalCart.totalPrice += +productPrice;

      fs.writeFileSync(p, JSON.stringify(totalCart)); // Assuming writeFileAsync writes totalCart to file asynchronously

      console.log("Cart updated successfully");
    } catch (err) {
      console.error("Error updating cart:", err);
    }
  };

  static getAllCart(cb) {
    fs.readFile(p, (err, data) => {
      let cartsData = { products: [], totalPrice: 0 };
      if (!err) cartsData = JSON.parse(data);
      // console.log(cartsData);
      cb(cartsData);
    });
  }
};
