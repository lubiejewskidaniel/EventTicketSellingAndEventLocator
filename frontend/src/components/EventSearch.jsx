import { useState } from "react";

export default function EventSearch({ loggedInUser }) {
	const [location, setLocation] = useState("");
	const [events, setEvents] = useState([]);
	const [message, setMessage] = useState("");

	// Fetch events by location and attach tickets to each
	const searchEvents = async () => {
		// Basic input validation
		if (!location.trim()) {
			setEvents([]);
			setMessage("Please enter a location.");
			return;
		}

		try {
			const response = await fetch(`http://localhost:5000/events/${location}`);

			if (!response.ok) {
				setEvents([]);
				setMessage("Location does not exist. Please type again.");
				return;
			}

			const eventsData = await response.json();

			// No events found for given location
			if (eventsData.length === 0) {
				setEvents([]);
				setMessage(`No events found in "${location}".`);
				return;
			}

			// Fetch tickets for each event
			const eventsWithTickets = await Promise.all(
				eventsData.map(async (event) => {
					const ticketRes = await fetch(
						`http://localhost:5000/tickets/${event.id}`
					);
					const tickets = await ticketRes.json();
					return { ...event, tickets };
				})
			);

			setEvents(eventsWithTickets);
			setMessage(""); // clear any previous message
		} catch (error) {
			console.error("Fetch error:", error);
			setEvents([]);
			setMessage("Something went wrong. Please try again later.");
		}
	};

	// Book a ticket for a given event and ticket type
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

	// Format date from "YYMMDD" to "DD/MM/YY"
	const formatDate = (rawDate) => {
		if (!rawDate || rawDate.length !== 6) return rawDate;
		const year = rawDate.substring(0, 2);
		const month = rawDate.substring(2, 4);
		const day = rawDate.substring(4, 6);
		return `${day}/${month}/${year}`;
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
			flexWrap: "wrap",
			gap: "10px",
			marginBottom: "20px",
		},
		input: {
			flex: "1",
			minWidth: "200px",
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
			cursor: "pointer",
			transition: "background-color 0.3s",
		},
		ticketButtonGeneral: {
			backgroundColor: "#007bff",
			color: "#fff",
		},
		ticketButtonVIP: {
			backgroundColor: "#6f42c1",
			color: "#fff",
		},
		ticketButtonStudent: {
			backgroundColor: "#28a745",
			color: "#fff",
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
		buttonGroup: {
			display: "flex",
			gap: "10px",
			flexWrap: "wrap",
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
				<button
					onClick={searchEvents}
					style={{ ...styles.button, ...styles.ticketButtonGeneral }}
				>
					Search
				</button>
			</div>

			{message && (
				<p style={{ color: "#cc0000", marginBottom: "15px" }}>{message}</p>
			)}

			{events.length > 0 && (
				<div>
					{events.map((event) => (
						<div key={event.id} style={styles.eventCard}>
							<h3 style={styles.eventTitle}>{event.name}</h3>
							<p style={styles.eventDescription}>{event.description}</p>
							<p style={styles.eventDate}>
								<strong>Date:</strong> {formatDate(event.date)}
							</p>

							<div style={styles.buttonGroup}>
								{event.tickets?.some((t) => t.ticketType === "General") && (
									<button
										onClick={() => handleBook(event.id, "General")}
										style={{ ...styles.button, ...styles.ticketButtonGeneral }}
									>
										Book General ticket
									</button>
								)}

								{event.tickets?.some((t) => t.ticketType === "VIP") && (
									<button
										onClick={() => handleBook(event.id, "VIP")}
										style={{ ...styles.button, ...styles.ticketButtonVIP }}
									>
										Book VIP ticket
									</button>
								)}

								{event.tickets?.some((t) => t.ticketType === "Student") && (
									<button
										onClick={() => handleBook(event.id, "Student")}
										style={{ ...styles.button, ...styles.ticketButtonStudent }}
									>
										Book Student ticket
									</button>
								)}
							</div>
						</div>
					))}
				</div>
			)}
		</section>
	);
}
