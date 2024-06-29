const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Home = sequelize.define('home', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tagline: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url_logo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url_favicon: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Home;