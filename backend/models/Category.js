const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');

const Category = sequelize.define('category', {
  Category_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Category.belongsTo(Product);
Product.hasMany(Category);

module.exports = Category;
