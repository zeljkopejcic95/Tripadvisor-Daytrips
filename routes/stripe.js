import express from "express";
import * as stripePage from "../controllers/stripe.js";

const router = express.Router();

router.get("/success", stripePage.success);

router.get("/failure", stripePage.failure);

export default router;
