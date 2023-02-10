const mariadb = require("mariadb");
const { Sequelize } = require("sequelize");

const config = require("./config.json");
const db = config.database;
const { host, port, user, password, db_name } = db;

const sequelize = new Sequelize(db_name, user, password, {
  host: host,
  port: port,
  dialect: "mariadb",
  logging: false,
});

const createDB = async () => {
  const connection = await mariadb.createConnection({ user: user, password: password });
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database exists!");
    })
    .catch(async (error) => {
      console.log("Creating new database!");
      connection.query(`CREATE DATABASE IF NOT EXISTS \`${db_name}\`;`);
      console.log("Database has been created!");
      await sequelize.sync();
      console.log("Database models have been synched!");
    });
};

module.exports = { sequelize, createDB };
