const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require("../database");

class Position extends Model {}

Position.init({
  // Model attributes are defined here
  owner: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  positions: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Position', // We need to choose the model name
  tableName: "positions"
});

module.exports = Position;