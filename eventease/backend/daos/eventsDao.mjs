import Database from "better-sqlite3";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "../../database/eventease.db");

const db = new Database(dbPath);

// EVENT FUNCTIONS BELOW

// Functon below fetches all events for a given location
// I using a prepared SQL statement to avoid SQL injection of course for security reasons
export const getEventsByLocation = (location) => {
	const stmt = db.prepare("SELECT * FROM events WHERE location = ?");
	return stmt.all(location);
};

// This function gets a single event based on its ID it is helpful when looking up details
// for a specific event
export const getEventById = (id) => {
	const stmt = db.prepare("SELECT * FROM events WHERE id = ?");
	return stmt.get(id);
};
