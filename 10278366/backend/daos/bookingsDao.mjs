import Database from "better-sqlite3";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "../../database/eventease.db");

const db = new Database(dbPath);

// TICKET BOOKING FUNCTION

// This function attempts to book a ticket for a user
export const bookTicket = (eventID, ticketType, username, quantity) => {
	// First, I want to check if the requested number of tickets is available
	const availabilityCheck = db.prepare(
		"SELECT availability FROM tickets WHERE eventID = ? AND ticketType = ?"
	);
	const ticket = availabilityCheck.get(eventID, ticketType);

	// If no ticket type is found OR not enough tickets are left, throw an error and
	// display message.
	if (!ticket || ticket.availability < quantity) {
		throw new Error("Not enough tickets available.");
	}

	// If there are enough tickets, subtract the quantity from the available tickets quantity
	const updateTicketAvailability = db.prepare(
		"UPDATE tickets SET availability = availability - ? WHERE eventID = ? AND ticketType = ?"
	);
	updateTicketAvailability.run(quantity, eventID, ticketType);

	// Then, I would like to insert a record of the booking into the bookings table
	// This keeps track of who booked what, and how many
	const addBookingToDB = db.prepare(
		"INSERT INTO bookings (eventID, ticketType, username, quantity) VALUES (?, ?, ?, ?)"
	);
	addBookingToDB.run(eventID, ticketType, username, quantity);

	// If everything succeeded again return a success message to simply inform user.
	return { message: "Booking successful!" };
};
