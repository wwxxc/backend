const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PromoCode = sequelize.define('promocode', {
    code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    product_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  const PromoUsage = sequelize.define('PromoUsage', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_server: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    promo_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    used_at: {
      type: DataTypes.DATE,
    },
  });

  module.exports = {PromoCode, PromoUsage}