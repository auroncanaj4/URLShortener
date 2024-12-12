import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export const getUrls = async () => {
  const [rows] = await pool.query("SELECT * from urls ORDER BY id DESC");
  return rows;
};

export const createUrl = async (originalUrl, shortCode, expiresAt) => {
  const [result] = await pool.query(
    `INSERT INTO urls (original_url, short_code, expires_at) VALUES (?, ?, ?)`,
    [originalUrl, shortCode, expiresAt]
  );

  return result;
};

export const getShortUrl = async (shortCode) => {
  const [results] = await pool.query(
    "SELECT id, original_url, expires_at FROM urls WHERE short_code = ?",
    [shortCode]
  );

  return results;
};

export const incrementClickCount = async (id) => {
  const [result] = await pool.query(
    "UPDATE urls SET click_count = click_count + 1 WHERE id = ?",
    [id]
  );
  return result;
};

export const deleteUrl = async (id) => {
  const [result] = await pool.query(`DELETE FROM urls WHERE id=?`, [id]);
  return result;
};
