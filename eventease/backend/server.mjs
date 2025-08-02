// Import the Express app that's been set up and configured in a separate file - app.mjs
// This keeps the main server file clean and modular in the way industry required
import { createApp } from "./app.mjs";

// Calling the function to get an instance of the app
// It returns a fully configured Express application
const app = createApp();

// As per assignment requirement taking port 3000 to work on.
const PORT = 3000;

// Start the server and listen for incoming HTTP requests
// When the server is ready, consol log will display message that server is running and on which port.
// In case of any error with server configuration we will know straight away.
app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
