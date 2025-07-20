import { getTicketsForEvent } from "../daos/ticketsDao.mjs";

export const fetchTickets = (req, res) => {
	// Extract the event ID from the URL parameters
	// For example, if the request is /tickets/5, then eventID will be "5"
	const { eventID } = req.params;

	// Using data access layer to get all ticket types for the given event
	// this can include General, VIP, or Student tickets
	const tickets = getTicketsForEvent(eventID);

	// If the returned array is empty, it means simple there are no tickets for this event
	// and of course message will be sent to inform user.
	if (tickets.length === 0) {
		return res
			.status(404)
			.json({ message: "No tickets found for this particular event." });
	}

	// If tickets were found, return them to the client as a JSON array
	res.json(tickets);
};
