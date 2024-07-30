const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Review = sequelize.define('Review', {
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  item_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nomor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Review;
