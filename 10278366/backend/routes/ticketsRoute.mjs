import express from "express";

// Imports controller function that will manage getting ticket data
// - this function will run when someone requests ticket information for an event
import { fetchTickets } from "../controllers/ticketsController.mjs";

// Create a new router instance just for ticket-related routes
const router = express.Router();

// It is definition of GET route where does not put eventID at all
router.get("/", (req, res) => {
	res.status(400).json({ message: "Event ID is required!" });
});

// Defines a GET route that expects an event ID in the URL - controller will then return the ticket types and availability for that event
router.get("/:eventID", fetchTickets);

export default router;
