const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require("../database");

class Tag extends Model {}

Tag.init({
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Tag', // We need to choose the model name
  tableName: "tags"
});

module.exports = Tag;