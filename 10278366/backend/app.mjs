// Import the core libraries needed to run an Express web server
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Middleware libraries
import bodyParser from "body-parser";
import cors from "cors";

import session from "express-session"; // Built-in session handling
import betterSqlite3Session from "express-session-better-sqlite3"; // A session store backed by SQLite as per assignment requirements
import Database from "better-sqlite3"; // SQLite database client to be able to use SQL/SQLite operations

// Route files that define how to manage specific paths
import eventsRoutes from "./routes/eventsRoute.mjs";
import ticketsRoute from "./routes/ticketsRoute.mjs";
import bookingsRoutes from "./routes/bookingsRoute.mjs";
import usersRoute from "./routes/usersRoute.mjs";

// This function creates and returns a fully configured Express app.
// I tried to build up clean way to organize the setup logic separately from the server
export function createApp() {
	const app = express();

	// Enable parsing of JSON in incoming requests, to be able to use it easily
	app.use(bodyParser.json());

	// SESSION SETUP
	// I ame using SQLite to store session data on the backend.
	// This is useful for remembering who's logged in between requests.
	// Also this is a part of assignment as user should to be logged in even when page refreshed in the browser.
	const sessDb = new Database("../database/sessions.db"); // Connects to the session database
	const SqliteStore = betterSqlite3Session(session, sessDb); // Creates a custom session store basic one for purposes of this assignment.

	app.use(
		session({
			store: new SqliteStore(), // Store sessions in SQLite
			secret: "WebDev", // Used to sign session IDs (should be in .env file more likely however for now will go through with this configuration)
			resave: true, // Saving session even if it wasn't modified - to keep track of any visit
			saveUninitialized: false, // Don't save sessions with no data
			rolling: true, // Resets cookie expiration on every request
			unset: "destroy", // Destroy session when calling req.session = null -> simple session management
			proxy: true, // If we are behind proxy proxy server can terminate HTTPS, or rewrite headers what in consequnce can bahave incorrectly
			// while working with cookies, https requests and so on.
			cookie: {
				maxAge: 600000, // Session lasts for 10 minutes in ms, the will be killed and user will be logged out
				httpOnly: false, // Should usually be true for security, but in my situation I have to keep access from my frontend
			},
		})
	);

	// CORS SETUP
	// Allow requests from my frontend app running on Vite at port 5173
	// Without this, the frontend is not able to communicate to the backend due to browser security rules
	app.use(
		cors({
			origin: "http://localhost:5173", // Only allow this origin as per Vite setup
			credentials: true, // Allows cookies or sessions to be sent over
		})
	);

	// API ROUTES
	// Each route handles a different part of my app
	// All routes are prefixed with /api for a clean API structure and current industry requirements
	app.use("/api/events", eventsRoutes);
	app.use("/api/tickets", ticketsRoute);
	app.use("/api/bookings", bookingsRoutes);
	app.use("/api/users", usersRoute);

	return app; // Return the fully set-up app instance which is used in server.mjs
}
