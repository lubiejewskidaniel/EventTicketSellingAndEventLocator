import { getUserByUsername } from "../daos/usersDao.mjs";

// Controller to handle user lookup by username (for login purposes)
export const fetchUser = (req, res) => {
	const { username } = req.params;

	const user = getUserByUsername(username);

	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}

	res.json(user); // Returns full user object including password & isAdmin
};
