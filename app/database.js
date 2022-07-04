const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
    define: {
      updatedAt: "updated_at",
      createdAt: "created_at"
    },
  }
);

module.exports = sequelize;
