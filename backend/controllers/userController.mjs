import { getUserByUsername } from "../daos/usersDao.mjs";
import bcrypt from "bcrypt";

export const loginUser = async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res
			.status(400)
			.json({ message: "Username and password are required." });
	}

	const user = getUserByUsername(username);

	if (!user) {
		return res.status(404).json({ message: "User not found." });
	}

	const passwordMatch = await bcrypt.compare(password, user.password);

	if (!passwordMatch) {
		return res.status(401).json({ message: "Incorrect password." });
	}

	// If success returns user info without password
	res.json({
		username: user.username,
		isAdmin: user.isAdmin === 1,
	});
};
