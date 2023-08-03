import express from "express";
import { catchAsync } from "../utilities/catchAsync.js";
import { isLoggedIn, isAuthor } from "../middleware.js";
import * as daytrips from "../controllers/daytrip.js";

const router = express.Router();

router.get("/", catchAsync(daytrips.showAll));

router.get("/:id", isLoggedIn, catchAsync(daytrips.showOne));

router.post("/", isLoggedIn, catchAsync(daytrips.createDaytrip));

router.put("/:id", isLoggedIn, isAuthor, catchAsync(daytrips.updateDaytrip));

router.delete("/:id", isLoggedIn, isAuthor, catchAsync(daytrips.deleteDaytrip));

export default router;
