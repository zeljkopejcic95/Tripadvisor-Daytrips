import express from "express";
import { catchAsync } from "../utilities/catchAsync.js";
import { isLoggedIn, isReviewAuthor } from "../middleware.js";
import * as reviews from "../controllers/reviews.js";

const router = express.Router({ mergeParams: true });

router.get("/", catchAsync(reviews.showAll));

router.post("/", isLoggedIn, catchAsync(reviews.createReview));

router.put(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.updateReview)
);

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

export default router;
