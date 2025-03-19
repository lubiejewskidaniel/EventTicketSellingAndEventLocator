// Imported necessary modules to create a web server
import express from "express"; // Express framework to handle HTTP requests
import path from "path"; // Path module to manage file paths
import { fileURLToPath } from "url"; // Converts module URLs to file paths
import bodyParser from "body-parser"; // Middleware to parse incoming JSON data

// Imported  routes  for API endpoints.
import eventsRoutes from "./routes/eventsRoute.mjs"; // Routes for event API calls

// As per ES6 getting setting up absolute path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // Extracts the directory name of the current file

// Initializing Express application
const app = express();

// Using middleware to parse JSON data to prepare correctly data for further use as an object
app.use(bodyParser.json());

// Connects routes to my Express app
app.use("/events", eventsRoutes); // Handles API requests for events

// Choosing port where the server will run
const PORT = 5000;

// Starts server and listens for requests on the specified above port
app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`); // Log the server URL to the console partialy for debuging
});
