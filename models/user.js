'use strict';
const {
  Model
} = require('sequelize');
const {hash} = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name_user: DataTypes.STRING,
    password_user: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        instance.password_user = hash(instance.password_user)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};