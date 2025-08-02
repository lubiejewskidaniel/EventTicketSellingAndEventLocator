import express from "express";

// Imports functions that manage user login, logout, and session checking
// These are the actually "controllers" that do the work behind the scenes
import {
	loginUser,
	logoutUser,
	getCurrentUser,
	registerUser,
} from "../controllers/userController.mjs";

// Creates a new router object — this lets us define separate routes for just "users"
// later it can be pluged into the main Express app under a specific path like /api/users
const router = express.Router();

// Defines a POST route for /login - This route is called when a user tries to log in
// The loginUser function will check credentials and set up the session
router.post("/login", loginUser);

// Defines a POST route for /logout - This one is used when a user wants to log out
// simply it will destroy the session
router.post("/logout", logoutUser);

// defines a POST route for /register - This one is called when any user want to register
// in the app
router.post("/register", registerUser);

// Defines a GET route for /session - thhis is used to check if the user is currently logged in
// Useful when the app first loads and wants to know if there's an active session for
// in this app for example when not logged in user wants to buy any tickets
router.get("/session", getCurrentUser);

// export function to use it elsewhere where required
export default router;
