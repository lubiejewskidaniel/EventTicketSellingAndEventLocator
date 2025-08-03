// Import the core libraries needed to run an Express web server
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Middleware libraries
import bodyParser from "body-parser";
import cors from "cors";

// Nasz nowy middleware sesji
import sessionMiddleware from "./middlewares/session.mjs";

// Route files
import eventsRoutes from "./routes/eventsRoute.mjs";
import ticketsRoute from "./routes/ticketsRoute.mjs";
import bookingsRoutes from "./routes/bookingsRoute.mjs";
import usersRoute from "./routes/usersRoute.mjs";

// Create and configure the Express app
export function createApp() {
	const app = express();

	// Middleware for parsing JSON
	app.use(bodyParser.json());

	// Modularized session middleware
	app.use(sessionMiddleware);

	// CORS middleware
	app.use(
		cors({
			origin: "http://localhost:5173",
			credentials: true,
		})
	);

	// API routes
	app.use("/api/events", eventsRoutes);
	app.use("/api/tickets", ticketsRoute);
	app.use("/api/bookings", bookingsRoutes);
	app.use("/api/users", usersRoute);

	return app;
}
