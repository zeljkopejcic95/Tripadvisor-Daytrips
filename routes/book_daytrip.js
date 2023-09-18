import express from "express";
import { catchAsync } from "../utilities/catchAsync.js";
import { isLoggedIn } from "../middleware.js";
import * as book_daytrip from "../controllers/book_daytrip.js";

const router = express.Router({ mergeParams: true });

router.get(
  "/booking/:travelerId",
  isLoggedIn,
  catchAsync(book_daytrip.showUserBookings)
);

router.post("/booking", isLoggedIn, catchAsync(book_daytrip.createBooking));

router.post("/payment", isLoggedIn, catchAsync(book_daytrip.payment));

export default router;
