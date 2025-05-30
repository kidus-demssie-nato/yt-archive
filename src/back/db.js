const { Pool } = require("pg");
require("dotenv").config;

const pool = new Pool({
  connectionString: process.env.dburl,
  ssl: process.env.dburl
    ? {
        rejectUnauthorized: false,
      }
    : false,
  user: "postgres",
  host: "localhost",
  database: "myapp",
  password: process.env.dbp,
  port: 5432,
});

module.exports = pool;
