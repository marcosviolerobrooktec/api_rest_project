'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: function () {
        const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFDB33"];
        return colors[Math.floor(Math.random() * colors.length)];
      }
    },
  }, {});
  Company.associate = function(models) {
    Company.hasMany(models.User, {
      foreignKey: 'companyId',
      as: 'users'
    });
  };
  return Company;
};