const mariadb = require('mariadb');
require('dotenv').config();

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectionLimit: process.env.DB_POOL_SIZE || 20,
  maxRetries: 3,
  acquireTimeout: 30000,
  idleTimeout: 60000
});

async function getConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
    return conn;
  } catch (err) {
    console.error("ERREUR SQL BRUTE :", err);
    throw err;
  }
}

module.exports = {
  pool,
  getConnection
};
