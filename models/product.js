const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const uuidv4 = uuid.v4();

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

// console.log('path', path.join(__dirname, "..", "data", 'products.json'));

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
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = uuidv4;
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static editProduct(product) {
    getProductsFromFile((products) => {
      const filteredProducts = products.filter(
        (prod) => prod.id !== product.id
      );
      const newProducts = [...filteredProducts, product];
      fs.writeFile(p, JSON.stringify(newProducts), (error) =>
        console.log(error)
      );
    });
  }

  static deleteProduct(id) {
    getProductsFromFile((products) => {
      const filteredProducts = products.filter((prod) => prod.id !== id);

      fs.writeFile(p, JSON.stringify(filteredProducts), (error) =>
        console.log(error)
      );
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findProductById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
      return product;
    });
  }
};
