import { getUserByUsername, createUser } from "../daos/usersDao.mjs";

// Importing bcrypt for security as I want to compare hashed passwords
// later on and also rigister new users with hashed passswords
import bcrypt from "bcrypt";

// LOGIN CONTROLLER

// This function manage logging a user - checks if the username and password match a user in the database
export const loginUser = async (req, res) => {
	const { username, password } = req.body;

	// Basic validation as iwould like to make sure both fields are provided
	if (!username || !password) {
		return res
			.status(400)
			.json({ message: "Username and password are required." });
	}

	// Now I want to find the user in the database
	const user = getUserByUsername(username);

	// If the user doesn't exist, returns an error with direct message about it
	if (!user) return res.status(404).json({ message: "User not found" });

	// Compares the provided password with the hashed password from the database
	const valid = await bcrypt.compare(password, user.password);

	// If the passwords don't match, send error and message agoain
	if (!valid) return res.status(401).json({ message: "Incorrect password" });

	// If login is successful, storing the username and isAdmin flag in the session
	// This keeps the user logged in on future requests because we would like also be sure
	// if logged user is admin or regular user.
	req.session.username = user.username;
	req.session.isAdmin = user.isAdmin === 1; // Convert SQLite 0 and 1 to true and false

	// Sending user's basic info back to the frontend
	res.json({
		username: user.username,
		isAdmin: user.isAdmin === 1,
	});
};

// LOGOUT CONTROLLER

// This function logs the user out by simply destroying session
export const logoutUser = (req, res) => {
	req.session = null;
	res.json({ message: "Logged out" }); // Confirm to the client that logout succeeded fo better UX
};

// SESSION CHECK CONTROLLER

// This function checks if a user is currently logged in
export const getCurrentUser = (req, res) => {
	// Simply if no session exists, the user is not logged in
	if (!req.session.username) {
		return res.status(401).json({ username: null });
	}

	// If the user is logged in, sending their informations back to the frontend
	res.json({
		// below are JS objects which returning data from req.session saved in loginUser
		username: req.session.username, // this is data about username and session
		isAdmin: req.session.isAdmin, // this is data about if user is admin or not
	});
};

// New controller function for registration for any new users
export const registerUser = async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res
			.status(400)
			.json({ message: "Username and password are required!" });
	}

	const existingUser = getUserByUsername(username);
	if (existingUser) {
		return res
			.status(409)
			.json({ message: "Sorry this username is already taken." });
	}

	try {
		const hashedPassword = await bcrypt.hash(password, 10); // hashing password with 10 signs
		createUser(username, hashedPassword); // my poin is by default set up isAdmin in my database to 0
		res.status(201).json({ message: "User registered successfully." });
	} catch (error) {
		console.error("Registration error:", error);
		res.status(500).json({ message: "Internal server error." });
	}
};
