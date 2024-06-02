const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('product', {
  product_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  product_slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  product_img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product_description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product_code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  product_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Product;
