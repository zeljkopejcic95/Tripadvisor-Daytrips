import express from "express";
import session from "express-session";
import passport from "passport";
import { AppError } from "./utilities/AppError.js";

import "dotenv/config";

import daytripRoutes from "./routes/daytrip.js";
import reviewsRoutes from "./routes/reviews.js";
import usersRoutes from "./routes/users.js";
import book_daytripRoutes from "./routes/book_daytrip.js";
import stripeRoutes from "./routes/stripe.js";

const app = express();

app.use(express.urlencoded({ extended: true }));

const sessionConfig = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60,
    maxAge: 1000 * 60 * 60,
  },
};
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

app.use("/dayTrip", daytripRoutes);
app.use("/dayTrip/:id/reviews", reviewsRoutes);
app.use("/", usersRoutes);
app.use("/dayTrip/:daytripId/", book_daytripRoutes);
app.use("/", stripeRoutes);

app.all("*", (req, res, next) => {
  next(new AppError("Page not found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "something went wrong" } = err;
  res.status(statusCode).send(message);
  console.error(err.stack);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
