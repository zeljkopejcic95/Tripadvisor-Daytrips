import { pool } from "../models/database.js";
import { AppError } from "../utilities/AppError.js";

export const showAll = async (req, res, next) => {
  const [dayTrips] = await pool.query(`SELECT * FROM daytrip`);
  res.send(dayTrips);
};

export const showOne = async (req, res, next) => {
  const { id } = req.params;
  const [dayTrip] = await pool.query(`SELECT * FROM daytrip WHERE id = ?`, [
    id,
  ]);
  if (dayTrip.length === 0) {
    throw new AppError("Day trip not found", 404);
  }
  res.send(dayTrip[0]);
};

export const createDaytrip = async (req, res, next) => {
  const [newDayTrip] = await pool.query(
    `INSERT INTO daytrip(name, price, description, author)
         VALUES(?, ?, ?, ?)`,
    [req.body.name, req.body.price, req.body.description, req.user]
  );
  res.send("new daytrip posted");
};

export const updateDaytrip = async (req, res, next) => {
  const { id } = req.params;
  const [updateDayTrip] = await pool.query(
    `UPDATE daytrip
       SET name = ?, price = ?, description = ?, author = ?
       WHERE id = ?`,
    [req.body.name, req.body.price, req.body.description, req.user, id]
  );
  if (updateDayTrip.changedRows === 0) {
    throw new AppError("Daytrip not found", 404);
  }
  res.send("daytrip updated");
};

export const deleteDaytrip = async (req, res, next) => {
  const { id } = req.params;
  const [deleteDayTrip] = await pool.query(`DELETE FROM daytrip WHERE id = ?`, [
    id,
  ]);
  if (deleteDayTrip.affectedRows === 0) {
    throw new AppError("Daytrip not found", 404);
  }
  res.send("daytrip deleted");
};
