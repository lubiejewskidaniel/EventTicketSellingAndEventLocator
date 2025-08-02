import express from "express";

// Importing the controller functions that handle the logic for events
// - fetchEvents will return events for a specific location
// - handleMissingLocation will respond when no location is given
import {
	fetchEvents,
	handleMissingLocation,
} from "../controllers/eventsController.mjs";

// Creates a new router for managing event-related routes
const router = express.Router();

// Defines a GET route for the base path "/" -  runs when the
// frontend tries to fetch events but doesn't include a location
// and responds with "Location is required" it is lets say to manage unexpected app behaviour
router.get("/", handleMissingLocation);

// Defines a GET route that includes a location in the URL
router.get("/:location", fetchEvents);

export default router;
