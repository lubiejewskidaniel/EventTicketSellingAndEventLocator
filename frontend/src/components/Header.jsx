import { useState } from "react";

export default function Header({ onLogin }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {
		if (username && password) {
			onLogin(username);
		} else {
			alert("Please enter username and password");
		}
	};

	const styles = {
		header: {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			padding: "20px 40px",
			backgroundColor: "#ffffff",
			boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
			borderBottom: "1px solid #ddd",
		},
		title: {
			fontSize: "28px",
			color: "#333",
			margin: 0,
		},
		form: {
			display: "flex",
			alignItems: "center",
			gap: "10px",
		},
		input: {
			padding: "8px 12px",
			border: "1px solid #ccc",
			borderRadius: "4px",
			fontSize: "14px",
			outline: "none",
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
		},
	};

	return (
		<header style={styles.header}>
			<h1 style={styles.title}>🎟️ EventEase</h1>

			<div style={styles.form}>
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					style={styles.input}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					style={styles.input}
				/>
				<button onClick={handleLogin} style={styles.button}>
					Login
				</button>
			</div>
		</header>
	);
}
