import { useState, useEffect } from "react";
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import EventSearch from "./components/EventSearch";
import Register from "./components/Register";

export default function App() {
	// here i going to tore information about the logged-in user
	const [loggedInUser, setLoggedInUser] = useState(null);
	const [showRegister, setShowRegister] = useState(false); // State to manage, showing register form

	// When the app first loads, will check if there is a saved session mean user already logged in
	useEffect(() => {
		const fetchSession = async () => {
			try {
				// here asks the backend if a user session is active
				const res = await fetch("http://localhost:3000/api/users/session", {
					credentials: "include", // include cookies for session
				});

				if (res.ok) {
					// If session exists, saves the user data
					const user = await res.json();
					setLoggedInUser(user);
				} else if (res.status === 401) {
					// No session found — user is not logged in - simple
					console.log("No active session");
				} else {
					// Any other response -not expected
					console.warn("Unexpected response:", res.status);
				}
			} catch (err) {
				// If the request fails in case if for example server down or something else
				console.error("Session check failed:", err);
			}
		};

		fetchSession(); // Runing session check
	}, []);

	// function below updates state when the user logs in successfully
	const handleLogin = (user) => {
		setLoggedInUser(user);
	};

	return (
		<>
			{!loggedInUser ? (
				showRegister ? (
					<Register onBack={() => setShowRegister(false)} />
				) : (
					<Header
						onLogin={handleLogin}
						onRegisterClick={() => setShowRegister(true)} // 👈 New prop
					/>
				)
			) : (
				<Welcome user={loggedInUser} onLogout={() => setLoggedInUser(null)} />
			)}

			<EventSearch loggedInUser={loggedInUser?.username} />
		</>
	);
}
