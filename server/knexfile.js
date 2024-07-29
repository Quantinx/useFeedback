require("dotenv").config();

module.exports = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
  },
  pool: {
    min: 0,
    max: 7,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};
