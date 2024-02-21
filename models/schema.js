const Sequelize = require("sequelize");

const sequelize = require("../util/db");

const Products = sequelize.define("products", {
  id: {
    type: Sequelize.STRING,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

const Carts = sequelize.define("carts", {
  id: {
    type: Sequelize.STRING,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  productId: {
    type: Sequelize.STRING,
    references: {
      model: "products",
      key: "id",
    },
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
});

Products.hasMany(Carts, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = { Products, Carts };
