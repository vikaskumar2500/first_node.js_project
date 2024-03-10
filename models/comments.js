const Sequelize = require("sequelize");

const sequelize = require("../util/db");

const Comments = sequelize.define("comments", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  comment: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Comments;
