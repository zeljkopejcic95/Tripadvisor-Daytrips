import express from "express";
import { catchAsync } from "../utilities/catchAsync.js";
import passport from "passport";
import * as users from "../controllers/users.js";
import { initialize } from "../config/passport.js";
initialize();

const router = express.Router();

router.post("/register", catchAsync(users.register));

router.post("/login", passport.authenticate("local"), users.login);

router.post("/logout", users.logout);

export default router;
