import { pool } from "./models/database.js";

export const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.send("you must be logged in");
  }
  next();
};

export const isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const [user] = await pool.query(`SELECT * FROM daytrip WHERE id = ?`, [id]);
  if (user[0].author !== req.user) {
    return res.send("you dont have permission to do that");
  }
  next();
};

export const isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const [review] = await pool.query(`SELECT * FROM reviews WHERE id = ?`, [
    reviewId,
  ]);
  if (review[0].user_id !== req.user) {
    return res.send("you dont have permission to do that");
  }
  next();
};
