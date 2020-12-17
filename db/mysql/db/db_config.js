require("dotenv").config();

module.exports = {
  HOST: process.env.DB_USERNAME, // localhost
  USER: process.env.DB_PASSWORD,
  PASSWORD: process.env.DB_HOST,
  DB: process.env.DB_DATABASE,
};
