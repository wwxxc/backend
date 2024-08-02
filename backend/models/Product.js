const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category');

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
  product_banner: {
    type: DataTypes.STRING,
  },
  product_description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product_code: {
    type: DataTypes.STRING,
  },
  product_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product_provider: {
    type: DataTypes.STRING,
  },
  product_special: {
    type: DataTypes.STRING,
  },
  isSpecial: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isPopular: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isServer: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isCheckUsername: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  checkUsername_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Product.belongsTo(Category);
Category.hasMany(Product);

module.exports = Product;
