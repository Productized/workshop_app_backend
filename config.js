const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  allowMultiQueries: true,
});

module.exports = connection;
