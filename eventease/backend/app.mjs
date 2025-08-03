// Import the core libraries needed to run an Express web server
import express from "express";

// Import grouped middlewares to keep code clean and scalable
import applyMiddlewares from "./middlewares/index.mjs";

// Route files
import eventsRoutes from "./routes/eventsRoute.mjs";
import ticketsRoute from "./routes/ticketsRoute.mjs";
import bookingsRoutes from "./routes/bookingsRoute.mjs";
import usersRoute from "./routes/usersRoute.mjs";

// Create and configure the Express app
export function createApp() {
	const app = express();

	// Register all global middlewares
	applyMiddlewares(app);

	// API routes
	app.use("/api/events", eventsRoutes);
	app.use("/api/tickets", ticketsRoute);
	app.use("/api/bookings", bookingsRoutes);
	app.use("/api/users", usersRoute);

	return app;
}
