// Import the database library
import Database from "better-sqlite3";

// Import path modules to handle file locations
import path from "path";
import { fileURLToPath } from "url";

// Get the current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the path to the database file
const dbPath = path.join(__dirname, "../../database/eventease.db");

// Connect to the SQLite database
const db = new Database(dbPath);

// Get events for a specific location
export const getEventsByLocation = (location) => {
	const stmt = db.prepare("SELECT * FROM events WHERE location = ?");
	return stmt.all(location);
};
