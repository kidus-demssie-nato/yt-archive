const { Pool } = require("pg");
require("dotenv").config;

const pool = new Pool({
  connectionString: process.env.dburl,
  ssl: {
    rejectUnauthorized: false,
  },
  user: "postgres",
  host: "localhost",
  database: "myapp",
  password: process.env.dbp,
  port: 5432,
});

module.exports = pool;
