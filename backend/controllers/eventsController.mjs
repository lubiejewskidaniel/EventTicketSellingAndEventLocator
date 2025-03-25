import { getEventsByLocation } from "../daos/eventsDao.mjs";

export const fetchEvents = (req, res) => {
	try {
		// Extracts location parameter from request
		const { location } = req.params;

		// Check if location is provided
		if (!location || location.trim() === "") {
			return res.status(400).json({ message: "Location is required." });
		}

		// Fetch events from the database
		const events = getEventsByLocation(location);

		// If no events are found, return a 404 error
		if (!events || events.length === 0) {
			return res
				.status(404)
				.json({ message: "No events found for this location." });
		}

		// Return the list of events
		res.json(events);
	} catch (error) {
		// Handle any unexpected server/database errors
		console.error("Error fetching events:", error);
		res.status(500).json({
			message: "An error happened while retrieving events from database.",
		});
	}
};
