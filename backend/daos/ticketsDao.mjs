import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "../../database/eventease.db");

const db = new Database(dbPath);

export const getTicketsForEvent = (eventID) => {
	const stmt = db.prepare(
		"SELECT ticketType, price, availability FROM tickets WHERE eventID = ?"
	);
	return stmt.all(eventID);
};
