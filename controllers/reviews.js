import { pool } from "../models/database.js";
import { AppError } from "../utilities/AppError.js";

export const showAll = async (req, res, next) => {
  const { id } = req.params;
  const [allReviews] = await pool.query(
    `SELECT * FROM reviews where daytrip_id = ?`,
    [id]
  );
  res.send(allReviews);
};

export const createReview = async (req, res, next) => {
  const { id } = req.params;
  const [newReview] = await pool.query(
    `INSERT INTO reviews (body, rating, daytrip_id, user_id)
        VALUES(?, ?, ?, ?)`,
    [req.body.body, req.body.rating, id, req.user]
  );
  res.send("new review posted");
};

export const updateReview = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const [changeReview] = await pool.query(
    `UPDATE reviews 
        SET body = ?, rating = ?, daytrip_id = ?, user_id = ?
        WHERE id = ?`,
    [req.body.body, req.body.rating, id, req.user, reviewId]
  );
  if (changeReview.affectedRows === 0) {
    throw new AppError("review not found", 404);
  }
  res.send("review changed");
};

export const deleteReview = async (req, res, next) => {
  const { reviewId } = req.params;
  const [deleteReview] = await pool.query(`DELETE FROM reviews WHERE id = ?`, [
    reviewId,
  ]);
  if (deleteReview.affectedRows === 0) {
    throw new AppError("review not found", 404);
  }
  res.send("review deleted");
};
