const mysql = require("mysql");
const dbConfig = require("../config/db_config.js");

// Create a connection to the database
const connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

module.exports = connection;
