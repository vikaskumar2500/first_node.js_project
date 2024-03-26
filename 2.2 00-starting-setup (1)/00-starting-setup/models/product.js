const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      const restProducts = products.filter((product) => product.id !== this.id);
      restProducts.push(this);
      fs.writeFile(p, JSON.stringify(restProducts), (err) => {
        console.log(err);
      });
    });
  }

  static findById(id, cb) {
    getProductsFromFile((data) => {
      const res = data.find((item) => item.id === id);
      cb(res);
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
