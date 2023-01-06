const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require("../database");

class User extends Model {}

User.init({
  // Model attributes are defined here
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User', // We need to choose the model name
  tableName: "users_todo"
});

module.exports = User;