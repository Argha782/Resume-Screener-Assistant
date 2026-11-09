// import Database from "better-sqlite3";
// import path from "node:path";
// import { fileURLToPath } from "node:url";

// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const db = new Database(path.join(__dirname, "../resume-screener.sqlite"));
// db.pragma("journal_mode = WAL");
// db.exec(`
//   CREATE TABLE IF NOT EXISTS analyses (
//     id TEXT PRIMARY KEY,
//     candidateName TEXT NOT NULL,
//     role TEXT NOT NULL,
//     matchScore INTEGER NOT NULL,
//     summary TEXT NOT NULL,
//     matchingSkills TEXT NOT NULL,
//     skillGaps TEXT NOT NULL,
//     interviewQuestions TEXT NOT NULL,
//     analyzedAt TEXT NOT NULL
//   )
// `);
// export default db;

import mysql from "mysql2/promise";
import "dotenv/config";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "resume_screener",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true
});
pool.getConnection()
  .then(connection => {
    console.log("MySQL connected successfully!");
    connection.release();
  })
  .catch(error => {
    console.error("MySQL connection failed:", error.message);
  });

export default pool;
