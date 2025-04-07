import { useState, useEffect } from "react";

export default function Header({ onLogin }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isMobile, setIsMobile] = useState(false);

	const handleLogin = () => {
		if (username && password) {
			onLogin(username);
		} else {
			alert("Please enter username and password");
		}
	};

	// Detect screen size
	useEffect(() => {
		const checkSize = () => setIsMobile(window.innerWidth <= 860);
		checkSize();
		window.addEventListener("resize", checkSize);
		return () => window.removeEventListener("resize", checkSize);
	}, []);

	const styles = {
		header: {
			display: "flex",
			flexDirection: isMobile ? "column" : "row", // stack vertically on small screens
			justifyContent: "space-between",
			alignItems: isMobile ? "flex-start" : "center",
			padding: isMobile ? "20px" : "20px 40px",
			backgroundColor: "#ffffff",
			boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
			borderBottom: "1px solid #ddd",
			gap: isMobile ? "20px" : "0px",
		},
		title: {
			textAlign: isMobile ? "center" : "left", //
			width: isMobile ? "100%" : "auto", //
			fontSize: "16px",
			color: "#333",
			margin: 0,
			padding: 10,
		},
		form: {
			display: "flex",
			flexDirection: isMobile ? "column" : "row", // stack inputs/buttons vertically on mobile
			alignItems: isMobile ? "stretch" : "center",
			width: isMobile ? "100%" : "auto",
			gap: "10px",
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
			<h1 style={styles.title}>🎟️ EventEase - Local Events App</h1>

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
