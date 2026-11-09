
import mysql from "mysql2/promise";
import "dotenv/config";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 4000),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "resume_screener",

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true,
  connectTimeout: 10000,

  ssl: {
    minVersion: "TLSv1.2"
  }
});

export async function checkDatabaseConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("TiDB connected successfully!");
    connection.release();
  } catch (error) {
    console.error("TiDB connection failed:", error.message);
    throw error;
  }
}

export default pool;
