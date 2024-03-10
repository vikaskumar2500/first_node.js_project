const Sequelize = require("sequelize");

const sequelize = require("../util/db");

const Blogs = sequelize.define("blogs", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = Blogs;
