import { pool } from "../models/database.js";
import { AppError } from "../utilities/AppError.js";

export const showUserBookings = async (req, res, next) => {
  const { daytripId, travelerId } = req.params;
  const [dayTrips] = await pool.query(
    `SELECT * FROM book_daytrip WHERE traveler_id = ?`,
    [travelerId]
  );
  if (dayTrips.length === 0) {
    throw new AppError("User not found", 404);
  }
  res.send(dayTrips);
};

export const createBooking = async (req, res, next) => {
  const { daytripId } = req.params;
  const [newTrip] = await pool.query(
    `INSERT INTO book_daytrip(daytrip_id, traveler_id, contact_email)
        VALUES(?, ?, ?)`,
    [daytripId, req.user.id, req.user.email]
  );
  res.send("trip booked");
};
