const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Slider = sequelize.define('slider', {
  slider_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  slider_img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slider_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Slider;