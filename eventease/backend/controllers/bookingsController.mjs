import { getEventById } from "../daos/eventsDao.mjs";
import {
	getTicketAvailability,
	reduceTicketQuantity,
} from "../daos/ticketsDao.mjs";
import { bookTicket as bookTicketInDB } from "../daos/bookingsDao.mjs";

// This function managing booking a ticket for a user.
// It performs few checks:
// - if the user is logged in,
// - if the event exists,
// - if the event is not in the past,
// - if the ticket type exists,
// - and if there are enough tickets.
// Only then it reduces ticket availability and confirms the booking.
export const bookTicket = (req, res) => {
	// First, I make sure the user is logged in by checking the session
	if (!req.session || !req.session.username) {
		return res
			.status(401)
			.json({ message: "You must be logged in to book tickets!" });
	}

	// Dividing accordingly and extracting data from the incoming request body from my API
	const { eventID, ticketType, quantity, username } = req.body;

	// Basic validation - I mean check if all required fields are provided
	// In case anything missing printing massage about it.
	if (!eventID || !ticketType || !quantity || !username) {
		return res.status(400).json({ message: "Missing booking details" });
	}

	// Now I want retrive details from the database
	const event = getEventById(eventID);

	// If no event is found with that eventID, return a 404 error and also printing message
	if (!event) {
		return res.status(404).json({ message: "Event not found" });
	}

	// I decided to convert the event's date from a compact format like "YYMMDD"
	// what was originally in provided database to a full JS Date
	// to organize in user friendly format
	const dateStr = `20${event.date.substring(0, 2)}-${event.date.substring(
		2,
		4
	)}-${event.date.substring(4, 6)}`;
	const eventDate = new Date(dateStr);
	const today = new Date();

	// Below I making sure user is not allowed bookings for past events.
	// That wouldn't make sense and is part of this assignment
	if (eventDate < today) {
		return res
			.status(400)
			.json({ message: "Cannot book tickets for a past event." });
	}

	// Checking if wanted ticket type exists and also if tickets are available
	const ticket = getTicketAvailability(eventID, ticketType);

	// In case if no such ticket type exists for the event, returning an error message again
	if (!ticket) {
		return res.status(404).json({ message: "Ticket type not found." });
	}

	// If there aren't enough tickets available to meet the requested quantity, returning an error
	// and also message going to be printed to inform about
	if (ticket.availability < quantity) {
		return res.status(400).json({ message: "Not enough tickets available." });
	}

	// If all checks passed — going ahead and reducing the ticket avaialbility and adding new record
	// in table booking in the database
	bookTicketInDB(eventID, ticketType, username, quantity);

	// Finally on the very end if all are ok sending a success response back to the user
	// with appropriate message.
	res.json({ message: "Ticket booked successfully!" });
};
