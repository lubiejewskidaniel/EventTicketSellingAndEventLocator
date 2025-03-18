import express from "express"; // Import Express
import { fetchEvents } from "../controllers/eventsController.mjs"; // Import event handler

const router = express.Router(); // Create router

router.get("/:location", fetchEvents); // Route to get events by location

export default router; // Export router
