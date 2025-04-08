import { useState, useEffect } from "react";
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import EventSearch from "./components/EventSearch";

export default function App() {
	const [loggedInUser, setLoggedInUser] = useState(null);

	// Check session when the app first loads
	useEffect(() => {
		const fetchSession = async () => {
			try {
				const res = await fetch("http://localhost:5000/users/session", {
					credentials: "include",
				});
				if (res.ok) {
					const user = await res.json();
					setLoggedInUser(user);
				} else if (res.status === 401) {
					// User is not logged in — ignore or log info
					console.log("No active session");
				} else {
					console.warn("Unexpected response:", res.status);
				}
			} catch (err) {
				console.error("Session check failed:", err);
			}
		};

		fetchSession();
	}, []);

	// Called on successful login
	const handleLogin = (user) => {
		setLoggedInUser(user);
	};

	return (
		<>
			{!loggedInUser ? (
				<Header onLogin={handleLogin} />
			) : (
				<Welcome user={loggedInUser} onLogout={() => setLoggedInUser(null)} />
			)}

			<EventSearch loggedInUser={loggedInUser?.username} />
		</>
	);
}
