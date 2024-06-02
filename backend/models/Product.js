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
  },
  product_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  isPopular: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = Product;
