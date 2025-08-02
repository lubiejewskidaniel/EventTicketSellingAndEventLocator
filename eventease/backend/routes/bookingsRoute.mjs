import express from "express";

import { bookTicket } from "../controllers/bookingsController.mjs";

// Creating a new router instance just for booking-related routes
const router = express.Router();

// Here I defines  a POST route for booking tickets - This route runs when the frontend sends a request to book a ticket
// The bookTicket controller will handle validation, check availability, and reduce ticket quantity
router.post("/", bookTicket);

export default router;
