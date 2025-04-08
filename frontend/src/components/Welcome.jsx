export default function Welcome({ user, onLogout }) {
	const styles = {
		header: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			padding: "20px",
			backgroundColor: "#ffffff",
			boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
			borderBottom: "1px solid #ddd",
		},
		title: {
			fontSize: "16px",
			color: "#333",
			margin: 0,
			padding: 10,
			textAlign: "center",
		},
		logoutButton: {
			marginTop: "10px",
			padding: "8px 16px",
			backgroundColor: "#dc3545",
			color: "#fff",
			border: "none",
			borderRadius: "4px",
			cursor: "pointer",
			fontSize: "14px",
		},
	};

	// Logout function
	const handleLogout = async () => {
		await fetch("http://localhost:5000/users/logout", {
			method: "POST",
			credentials: "include",
		});
		onLogout(); // delete user from frontend
	};

	return (
		<header style={styles.header}>
			<h1 style={styles.title}>🎟️ EventEase - Local Events App</h1>
			<p>
				Welcome <strong>{user.username}</strong>!{" "}
				{user.isAdmin ? "Admin panel" : "Regular user"}
			</p>
			<button onClick={handleLogout} style={styles.logoutButton}>
				Log out
			</button>
		</header>
	);
}
