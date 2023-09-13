import express from "express";
import { catchAsync } from "../utilities/catchAsync.js";
import { isLoggedIn } from "../middleware.js";
import * as book_daytrip from "../controllers/book_daytrip.js";

const router = express.Router({ mergeParams: true });

router.get(
  "/:travelerId",
  isLoggedIn,
  catchAsync(book_daytrip.showUserBookings)
);

router.post("/", isLoggedIn, catchAsync(book_daytrip.createBooking));

export default router;
