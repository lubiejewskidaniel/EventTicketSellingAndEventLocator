import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "../../database/eventease.db");

const db = new Database(dbPath);

export const bookTicket = (eventID, ticketType, username, quantity) => {
	const availabilityCheck = db.prepare(
		"SELECT availability FROM tickets WHERE eventID = ? AND ticketType = ?"
	);
	const ticket = availabilityCheck.get(eventID, ticketType);

	if (!ticket || ticket.availability < quantity) {
		throw new Error("Not enough tickets available.");
	}

	const updateTicketAvailability = db.prepare(
		"UPDATE tickets SET availability = availability - ? WHERE eventID = ? AND ticketType = ?"
	);
	updateTicketAvailability.run(quantity, eventID, ticketType);

	const addBookingToDB = db.prepare(
		"INSERT INTO bookings (eventID, ticketType, username, quantity) VALUES (?, ?, ?, ?)"
	);
	addBookingToDB.run(eventID, ticketType, username, quantity);

	return { message: "Booking successful!" };
};
