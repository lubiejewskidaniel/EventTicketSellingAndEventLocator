import { getEventsByLocation } from "../daos/eventsDao.mjs";

export const fetchEvents = (req, res) => {
	const { location } = req.params;
	const events = getEventsByLocation(location);

	if (events.length === 0) {
		return res
			.status(404)
			.json({ message: "No events found for this location." });
	}

	res.json(events);
};
