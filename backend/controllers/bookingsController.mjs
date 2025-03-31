import { bookTicket } from "../daos/bookingsDao.mjs";

export const createBooking = (req, res) => {
	try {
		const { eventID, ticketType, quantity, username } = req.body;
		if (!eventID || !ticketType || !quantity || !username) {
			return res.status(400).json({ message: "Missing required fields." });
		}

		const result = bookTicket(eventID, ticketType, username, quantity);
		res.json(result);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};
