// Import the core libraries needed to run an Express web server
import express from "express";

// Middleware libraries
import bodyParser from "./middlewares/bodyParser.mjs";
import corsMiddleware from "./middlewares/cors.mjs";

// Import the modularized CORS middleware from the middlewares directory
import sessionMiddleware from "./middlewares/session.mjs";

// Route files
import eventsRoutes from "./routes/eventsRoute.mjs";
import ticketsRoute from "./routes/ticketsRoute.mjs";
import bookingsRoutes from "./routes/bookingsRoute.mjs";
import usersRoute from "./routes/usersRoute.mjs";

// Create and configure the Express app
export function createApp() {
	const app = express();

	// MIDDLEWARES
	app.use(bodyParser); // Middleware for parsing JSON
	app.use(sessionMiddleware); // Modularized session middleware
	app.use(corsMiddleware); // Enable CORS for incoming requests (e.g., from the frontend running on localhost:5173)

	// API routes
	app.use("/api/events", eventsRoutes);
	app.use("/api/tickets", ticketsRoute);
	app.use("/api/bookings", bookingsRoutes);
	app.use("/api/users", usersRoute);

	return app;
}
