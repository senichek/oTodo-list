const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require("../database");

class Task extends Model {}

Task.init({
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  owner: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Task', // We need to choose the model name
  tableName: "tasks_todo"
});

module.exports = Task;