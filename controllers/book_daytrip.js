import { pool } from "../models/database.js";
import { AppError } from "../utilities/AppError.js";
import "dotenv/config";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

export const payment = async (req, res, next) => {
  const { daytripId } = req.params;
  const [dayTrip] = await pool.query(
    `SELECT id, name, price FROM daytrip WHERE id = ?`,
    [daytripId]
  );
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: dayTrip[0].name,
          },
          unit_amount: Math.round(dayTrip[0].price * 100),
        },
        quantity: 1,
      },
    ],
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/failure",
  });
  res.send(session.url);
};
