const path = require('path');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true, 
      get() {
        const rawValue = this.getDataValue('profilePicture');
        return rawValue ? path.resolve(rawValue) : null;
      }
    },
    companyId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Companies',
        key: 'id',
      },
      allowNull: false,
    }
  });

  User.associate = function(models){
    User.belongsTo(models.Company, {
      foreignKey: 'companyId',
      as: 'company'
    });
  };

  return User;
};