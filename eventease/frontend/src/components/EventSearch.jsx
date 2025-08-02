import { useState } from "react";
import SearchBar from "./SearchBar";
import EventBox from "./EventBox";
import Map from "./Map";

export default function EventSearch({ loggedInUser }) {
	const [location, setLocation] = useState("");
	const [events, setEvents] = useState([]);
	const [message, setMessage] = useState("");

	// Fetch events based on loction
	const searchEvents = async () => {
		try {
			const response = await fetch(
				`http://localhost:3000/api/events/${location}`
			);

			if (!response.ok) {
				setEvents([]);
				setMessage("Location does not exist. Please try again.");
				return;
			}

			const eventsData = await response.json();

			if (eventsData.length === 0) {
				setEvents([]);
				setMessage(`No events found in "${location}".`);
				return;
			}

			// For each event, fetch ticket data dsssssssss
			const eventsWithTickets = await Promise.all(
				eventsData.map(async (event) => {
					const ticketRes = await fetch(
						`http://localhost:3000/api/tickets/${event.id}`
					);
					const tickets = await ticketRes.json();
					return { ...event, tickets };
				})
			);

			setEvents(eventsWithTickets);
			setMessage("");
		} catch (error) {
			console.error("Error fetching events:", error);
			setEvents([]);
			setMessage("Something went wrong. Please try again later.");
		}
	};

	// Handle user's booking request
	const handleBook = async (eventID, ticketType) => {
		const username = loggedInUser?.username || loggedInUser || "";

		const response = await fetch("http://localhost:3000/api/bookings", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({
				eventID,
				ticketType,
				quantity: 1,
				username: username,
			}),
		});

		if (!response.ok) {
			const error = await response.json();
			alert(error.message);
			return;
		}

		const result = await response.json();
		alert(result.message || "Booking Successful");
	};

	// Format event date from "YYMMDD" to "DD/MM/YY"
	const formatDate = (rawDate) => {
		if (!rawDate || rawDate.length !== 6) return rawDate;
		const year = rawDate.substring(0, 2);
		const month = rawDate.substring(2, 4);
		const day = rawDate.substring(4, 6);
		return `${day}/${month}/${year}`;
	};

	// Shared styles passed to child components what is
	// pretty god as in other coponents can keep code clean and tidy
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
			minWidth: "300px",
			padding: "10px",
			fontSize: "16px",
			border: "1px solid #ccc",
			borderRadius: "4px",
		},
		button: {
			padding: "9px 20px",
			fontSize: "16px",
			border: "none",
			borderRadius: "4px",
			cursor: "pointer",
			transition: "background-color 0.3s",
		},
		searchButton: {
			backgroundColor: "#00793f",
			color: "#fff",
		},
		ticketButtonGeneral: {
			backgroundColor: "#007eff",
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
		listNoBullets: {
			listStyleType: "none",
			paddingLeft: 0,
			margin: 0,
		},
	};

	return (
		<section style={styles.container}>
			<h2>🔎 Find Events in Your Area</h2>

			<SearchBar
				location={location}
				setLocation={setLocation}
				searchEvents={searchEvents}
				styles={styles}
			/>

			{message && (
				<p style={{ color: "#cc0000", marginBottom: "15px" }}>{message}</p>
			)}

			{events.length > 0 &&
				events.map((event) => (
					<EventBox
						key={event.id}
						event={event}
						styles={styles}
						bookTicket={handleBook}
						formatDate={formatDate}
					/>
				))}

			{/* Leaflet map will be visable under the event cards */}
			<Map events={events} />
		</section>
	);
}
