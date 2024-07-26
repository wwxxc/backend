const sequelize = require('../config/database');
const User = require('./User');
const Transaction = require('./Transaction');
const Product = require('./Product');
const Slider = require('./Slider');
const Category = require('./Category');
const Home = require('./Home');
const Invoice = require('./invoice');

sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
});

module.exports = {
  Transaction,
  Product,
  Slider,
  Category,
  Invoice,
  Home,
};
