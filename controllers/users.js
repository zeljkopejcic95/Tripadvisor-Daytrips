import { pool } from "../models/database.js";
import bcrypt from "bcrypt";

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const [user] = await pool.query(
    `INSERT INTO users(username, email, password)
       VALUES(?, ?, ?)`,
    [username, email, hash]
  );
  res.send("success");
};

export const login = (req, res) => {
  res.send("welcome");
};

export const logout = (req, res) => {
  req.logout((err) => {
    if (!err) {
      return res.send("logged out");
    }
  });
};
