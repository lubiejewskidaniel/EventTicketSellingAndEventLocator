import { getTicketsForEvent } from "../daos/ticketsDao.mjs";

export const fetchTickets = (req, res) => {
	const { eventID } = req.params;
	const tickets = getTicketsForEvent(eventID);

	if (tickets.length === 0) {
		return res
			.status(404)
			.json({ message: "No tickets found for this particular  event." });
	}

	res.json(tickets);
};
