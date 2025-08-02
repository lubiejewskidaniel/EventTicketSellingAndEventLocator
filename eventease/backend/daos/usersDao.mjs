// It allows us to interact with a local SQLite database using SQL queries
import Database from "better-sqlite3";

// Imports path tools to help with file paths in a cross-platform way
import path from "path";
import { fileURLToPath } from "url";

// These two lines are needed because we're using ES Modules import/export features
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Building full path to the SQLite database file
// ../../database/eventease.db means: go down two folders and then into the "database" folder is eventease.db
const dbPath = path.join(__dirname, "../../database/eventease.db");

// Opens a connection to the SQLite database
const db = new Database(dbPath);

// This function fetches a user from the "users" table based on their username
// It's used when someone tries to log in, to check if the username exists
// and to compare the stored (hashed by byCrypt) password with the one they entered - simple validation
// for security purposes
export const getUserByUsername = (username) => {
	const stmt = db.prepare("SELECT * FROM users WHERE username = ?"); // ? prevents SQL injection
	return stmt.get(username);
};

// Function below creates a new user in the database
// It stores the username and hashed password, and sets isAdmin to 0 by default as per my requiremet
export const createUser = (username, hashedPassword) => {
	const stmt = db.prepare(
		"INSERT INTO users (username, password, isAdmin) VALUES (?, ?, 0)"
	);
	stmt.run(username, hashedPassword);
};
