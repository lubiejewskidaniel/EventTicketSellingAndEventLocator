import { useState } from "react";

// This component shows a simple registration form with username and password
export default function Register({ onBack }) {
	// These useState hooks store the form values and any message
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	// fFunciton below will run when the user clicks the Register button
	// It is pretty simple so I did not comment this one to much
	const handleRegister = async () => {
		// Sendingrequest to the backend with the user's info
		const response = await fetch("http://localhost:3000/api/users/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username, password }),
		});

		// The response from the server tells us if registration worked or not
		const data = await response.json();
		if (response.ok) {
			setMessage("Registration successful! You can now log in.");
			setUsername("");
			setPassword("");
		} else {
			setMessage(data.message);
		}
	};

	const styles = {
		container: {
			padding: "40px",
			border: "1px solid #ddd",
			borderRadius: "8px",
			backgroundColor: "#f9f9f9",
			maxWidth: "400px",
			margin: "60px auto",
			textAlign: "center",
			fontFamily: "Arial, sans-serif",
			boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
		},
		title: {
			marginBottom: "20px",
			fontSize: "24px",
			color: "#333",
		},
		input: {
			padding: "10px",
			margin: "10px 0",
			width: "90%",
			border: "1px solid #ccc",
			borderRadius: "4px",
			fontSize: "16px",
		},
		button: {
			marginTop: "10px",
			marginRight: "8px",
			padding: "10px 20px",
			fontSize: "16px",
			border: "none",
			borderRadius: "4px",
			cursor: "pointer",
			backgroundColor: "#007bff",
			color: "#fff",
			transition: "background-color 0.3s ease",
		},
		backButton: {
			backgroundColor: "#6c757d",
		},
		message: {
			marginTop: "15px",
			color: "#333",
			fontSize: "14px",
		},
	};

	return (
		<div style={styles.container}>
			<h2 style={styles.title}>Register</h2>

			<input
				type="text"
				placeholder="Username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				style={styles.input}
			/>
			<br />

			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				style={styles.input}
			/>
			<br />

			<button onClick={handleRegister} style={styles.button}>
				Register
			</button>

			<button
				onClick={onBack}
				style={{ ...styles.button, ...styles.backButton }}
			>
				Back to Login
			</button>

			<p style={styles.message}>{message}</p>
		</div>
	);
}
