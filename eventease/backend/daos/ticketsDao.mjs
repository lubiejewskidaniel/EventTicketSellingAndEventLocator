import Database from "better-sqlite3";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "../../database/eventease.db");

const db = new Database(dbPath);

// DATA ACCESS FUNCTIONS BELOW

// This function returns all ticket types for a specific event
// lets say if eventID = 3, it might return "General", "VIP", "Student"
export const getTicketsForEvent = (eventID) => {
	const stmt = db.prepare(
		"SELECT ticketType, price, availability FROM tickets WHERE eventID = ?"
	);
	return stmt.all(eventID);
};

// This function checks if a certain type of ticket exists for an event,
// and how many are availabl using when validating whether a booking is possible
export const getTicketAvailability = (eventID, ticketType) => {
	const stmt = db.prepare(
		"SELECT * FROM tickets WHERE eventID = ? AND ticketType = ?"
	);
	return stmt.get(eventID, ticketType);
};

// This function decreases the number of available tickets in the database
// Lets say if someone books 2 tickets, it subtracts 2 from the availability
// However in my app when working with frontend I decided to allow to buy 1 ticket by each click
// on "Buy Ticket" button
export const reduceTicketQuantity = (eventID, ticketType, quantity) => {
	const stmt = db.prepare(
		"UPDATE tickets SET availability = availability - ? WHERE eventID = ? AND ticketType = ?"
	);
	stmt.run(quantity, eventID, ticketType);
};
