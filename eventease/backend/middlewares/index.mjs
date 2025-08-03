import bodyParser from "./bodyParser.mjs";
import corsMiddleware from "./cors.mjs";
import sessionMiddleware from "./session.mjs";

/**
 * Apply all app-level middleware
 * @param {import('express').Express} app - The Express application instance
 */

export default function applyMiddlewares(app) {
	app.use(bodyParser); // Parses JSON request bodies
	app.use(sessionMiddleware); // Handles session persistence
	app.use(corsMiddleware); // Enables CORS for the frontend
}
