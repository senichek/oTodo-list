const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: "ec2-54-228-218-84.eu-west-1.compute.amazonaws.com",
    dialect: "postgres",
    dialectOptions: {
      "ssl": true
    },
    define: {
      updatedAt: "updated_at",
      createdAt: "created_at"
    },
  }
);

module.exports = sequelize;
