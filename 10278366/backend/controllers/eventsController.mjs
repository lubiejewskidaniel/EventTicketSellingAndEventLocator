import { getEventsByLocation } from "../daos/eventsDao.mjs";

// This function runs when the client sends a request to /events without a location.
// Since the route requires a location, we return a 400 Bad Request error with a message.
export const handleMissingLocation = (req, res) => {
	res.status(400).json({ message: "Location is required." });
};

// This function handles GET requests to /events/:location
// It looks up events for a specific city.
export const fetchEvents = (req, res) => {
	try {
		// Get the "location" from the URL parameters.
		// For example, if the request is to /events/London, location will be "London".
		const { location } = req.params;

		// If the location is missing or just empty spaces, returns an error.
		// This makes sure the client actually provided a valid search term.
		if (!location || location.trim() === "") {
			return res.status(400).json({ message: "Location is required." });
		}

		// Use the data access object to fetch events from the database.
		// This function returns an array of events that match the location.
		const events = getEventsByLocation(location);

		// If the array is empty or null, there are no events in the database for this location.
		// So app  returns 404 Not Found to inform the client of course.
		if (!events || events.length === 0) {
			return res
				.status(404)
				.json({ message: "No events found for this location." });
		}

		// If found events, sending them back to the client as a JSON response.
		res.json(events);
	} catch (error) {
		// If something unexpected goes wrong (like a database crash or any other database related error),
		// catching the error and returns a 500 Internal Server Error.
		// I think it is good way to manage most unwanted behaviour.
		console.error("Error fetching events:", error);
		res.status(500).json({
			message: "An error happened while retrieving events from database.",
		});
	}
};
