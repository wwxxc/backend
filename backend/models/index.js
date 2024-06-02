const sequelize = require('../config/database');
const User = require('./User');
const Transaction = require('./Transaction');
const Product = require('./Product');
sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
});

module.exports = {
  User,
  Transaction,
  Product,
};
