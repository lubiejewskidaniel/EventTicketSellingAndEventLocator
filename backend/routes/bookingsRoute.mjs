import express from "express";
import { createBooking } from "../controllers/bookingsController.mjs";

const router = express.Router();
router.post("/", createBooking);
export default router;
