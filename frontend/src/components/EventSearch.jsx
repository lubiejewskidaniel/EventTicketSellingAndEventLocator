import { useState } from "react";

export default function EventSearch({ loggedInUser }) {
	const [location, setLocation] = useState("");
	const [events, setEvents] = useState([]);

	const searchEvents = async () => {
		const res = await fetch(`http://localhost:5000/events/${location}`);
		const data = await res.json();
		setEvents(data);
	};

	const handleBook = async (eventID, ticketType) => {
		if (!loggedInUser) return alert("Please login first");

		const response = await fetch("http://localhost:5000/bookings", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				eventID,
				ticketType,
				quantity: 1,
				username: loggedInUser,
			}),
		});

		const result = await response.json();
		alert(result.message || "Booking attempted");
	};

	const styles = {
		container: {
			padding: "30px",
			maxWidth: "800px",
			margin: "0 auto",
			fontFamily: "Arial, sans-serif",
		},
		form: {
			display: "flex",
			alignItems: "center",
			gap: "10px",
			marginBottom: "20px",
		},
		input: {
			flex: "1",
			padding: "10px",
			fontSize: "16px",
			border: "1px solid #ccc",
			borderRadius: "4px",
		},
		button: {
			padding: "10px 20px",
			fontSize: "16px",
			border: "none",
			borderRadius: "4px",
			backgroundColor: "#007bff",
			color: "#fff",
			cursor: "pointer",
		},
		buttonSecondary: {
			marginLeft: "10px",
			backgroundColor: "#28a745",
		},
		eventCard: {
			border: "1px solid #ddd",
			borderRadius: "8px",
			padding: "15px",
			marginBottom: "15px",
			boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
		},
		eventTitle: {
			margin: "0 0 10px 0",
			fontSize: "20px",
			color: "#333",
		},
		eventDescription: {
			marginBottom: "10px",
			color: "#555",
		},
		eventDate: {
			fontSize: "14px",
			color: "#888",
			marginBottom: "10px",
		},
	};

	return (
		<section style={styles.container}>
			<h2>🎯 Find Events in Your Area</h2>
			<div style={styles.form}>
				<input
					type="text"
					placeholder="Type a location (e.g. London)"
					value={location}
					onChange={(e) => setLocation(e.target.value)}
					style={styles.input}
				/>
				<button onClick={searchEvents} style={styles.button}>
					Search
				</button>
			</div>

			{events.length > 0 && (
				<div>
					{events.map((event) => (
						<div key={event.id} style={styles.eventCard}>
							<h3 style={styles.eventTitle}>{event.name}</h3>
							<p style={styles.eventDescription}>{event.description}</p>
							<p style={styles.eventDate}>
								<strong>Date:</strong> {event.date}
							</p>
							<button
								onClick={() => handleBook(event.id, "General")}
								style={styles.button}
							>
								Book General
							</button>
							<button
								onClick={() => handleBook(event.id, "VIP")}
								style={{ ...styles.button, ...styles.buttonSecondary }}
							>
								Book VIP
							</button>
						</div>
					))}
				</div>
			)}
		</section>
	);
}
