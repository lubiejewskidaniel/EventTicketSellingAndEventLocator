// Import required modules for session handling and SQLite database
import session from "express-session";
import betterSqlite3Session from "express-session-better-sqlite3";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

// Resolve the absolute path to the session database file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, "../../database/sessions.db");

// Initialize the SQLite database instance for storing sessions
const sessDb = new Database(dbPath);

// Create a custom session store using SQLite
const SqliteStore = betterSqlite3Session(session, sessDb);

// Export the configured session middleware
export default session({
	store: new SqliteStore(), // Use the SQLite store to persist sessions
	secret: "WebDev", // Session secret (should be stored in .env in production)
	resave: true, // Forces session to be saved back to the store even if not modified
	saveUninitialized: false, // Don't save empty sessions (helps with storage efficiency)
	rolling: true, // Reset the session expiration time on every request
	unset: "destroy", // Destroy session on logout (when req.session = null)
	proxy: true, // Enables support for reverse proxies (e.g. Nginx, Heroku)
	cookie: {
		maxAge: 600000, // Session cookie lifespan: 10 minutes (in milliseconds)
		httpOnly: false, // Allows access to the cookie from JavaScript (should be true in production for security)
		// secure: true,              // Can b uncommented for production to allow cookies only over HTTPS
	},
});
