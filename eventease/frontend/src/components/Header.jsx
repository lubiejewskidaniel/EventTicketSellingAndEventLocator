import { useState, useEffect } from "react";

// This Header component shows the login form at the top of the page.
// My point was to lets the user type in their username and password and when they click
//  the login button, sends the login data to the server. If the login is successful,
//  the app saves the user info. I also wanted to do checks if the screen is small
// (like on a phone) and changes the layout to fit better.
// All the styles are included in the same file as I wanted to focuse more on logic and
// app usability than look.
export default function Header({ onLogin, onRegisterClick }) {
	// these hooks store state - what the user types into the input fieled
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	// tracks if the user is on a mobile screen
	const [isMobile, setIsMobile] = useState(false);

	// function below is basically triggered when the user clicks the Login button
	const handleLogin = async () => {
		try {
			// Send the username and password to the backend login API to fetch data
			const response = await fetch("http://localhost:3000/api/users/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
				credentials: "include", // This includes cookies for session management
			});

			// If the login failed, show an error message
			if (!response.ok) {
				const error = await response.json();
				alert(`${error.message}`);
				return;
			}

			// If login is successful, get user data and pass it up to the parent
			const data = await response.json();
			onLogin(data); // Example: { username: "daniel", isAdmin: true }
		} catch (err) {
			console.error("Login error:", err);
			alert("Something went wrong while logging in.");
		}
	};

	// This checks the screen size and updates layout if it's mobile
	// first checks size on first render and keeping checks on any resize
	useEffect(() => {
		const checkSize = () => setIsMobile(window.innerWidth <= 860);
		checkSize();
		window.addEventListener("resize", checkSize);
		return () => window.removeEventListener("resize", checkSize); // this line removes event listener when componenet is unmounted
	}, []);

	// Styles
	const styles = {
		header: {
			display: "flex",
			flexDirection: isMobile ? "column" : "row",
			justifyContent: "space-between",
			alignItems: isMobile ? "flex-start" : "center",
			padding: isMobile ? "20px" : "20px 40px",
			backgroundColor: "#ffffff",
			boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
			borderBottom: "1px solid #ddd",
			gap: isMobile ? "20px" : "0px",
		},
		title: {
			textAlign: isMobile ? "center" : "left",
			width: isMobile ? "100%" : "auto",
			fontSize: "16px",
			color: "#333",
			margin: 0,
			padding: 10,
		},
		form: {
			display: "flex",
			flexDirection: isMobile ? "column" : "row",
			alignItems: isMobile ? "stretch" : "center",
			width: isMobile ? "100%" : "auto",
			gap: "10px", // space between input and button
		},
		input: {
			padding: "8px 12px",
			border: "1px solid #ccc",
			borderRadius: "4px",
			fontSize: "14px",
			outline: "none",
			width: isMobile ? "100%" : "auto",
		},
		button: {
			padding: "8px 16px",
			backgroundColor: "#007bff",
			color: "#fff",
			border: "none",
			borderRadius: "4px",
			cursor: "pointer",
			fontSize: "14px",
			transition: "background-color 0.3s",
			width: isMobile ? "100%" : "auto",
		},
	};

	return (
		<header style={styles.header}>
			<h1 style={styles.title}>EventEase - Local Events App</h1>

			<div style={styles.form}>
				{/* Username input, text area*/}
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					style={styles.input}
				/>

				{/* Password input field */}
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					style={styles.input}
				/>

				{/* Login button to login registered user*/}
				<button onClick={handleLogin} style={styles.button}>
					Login
				</button>
				{/* Register button to register new user*/}
				<button onClick={onRegisterClick} style={styles.button}>
					Register
				</button>
			</div>
		</header>
	);
}
