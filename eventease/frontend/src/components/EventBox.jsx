// This component is called EventBox, and it shows each  event on the page.
// It displays the event name, description, and the date using the formatDate function.
// It also shows the tickets for that event by using the TicketInfo component,
// which lists the types of tickets and how many are available.
// Below that, there are buttons to book each ticket type — General, VIP, or Student — but
// only if that ticket type exists.
// When a user clicks a button, it calls the bookTicket function to try and book one ticket.
// All the styles for how things look are passed again in through props as per other components.
// This  is to show everything in easy way about one event in a simple and clear way.

import TicketInfo from "./TicketInfo";

export default function EventBox({ event, styles, bookTicket, formatDate }) {
	const hasTicketType = (type) => {
		return event.tickets?.some((ticket) => ticket.ticketType === type);
	};

	const handleBooking = (type) => {
		bookTicket(event.id, type);
	};

	return (
		<div style={styles.eventCard}>
			<h3 style={styles.eventTitle}>{event.name}</h3>
			<p style={styles.eventDescription}>{event.description}</p>
			<p style={styles.eventDate}>
				<strong>Date:</strong> {formatDate(event.date)}
			</p>

			<TicketInfo tickets={event.tickets} styles={styles} />

			<div style={styles.buttonGroup}>
				{hasTicketType("General") && (
					<button
						onClick={() => handleBooking("General")}
						style={{ ...styles.button, ...styles.ticketButtonGeneral }}
					>
						Book General ticket
					</button>
				)}

				{hasTicketType("VIP") && (
					<button
						onClick={() => handleBooking("VIP")}
						style={{ ...styles.button, ...styles.ticketButtonVIP }}
					>
						Book VIP ticket
					</button>
				)}

				{hasTicketType("Student") && (
					<button
						onClick={() => handleBooking("Student")}
						style={{ ...styles.button, ...styles.ticketButtonStudent }}
					>
						Book Student ticket
					</button>
				)}
			</div>
		</div>
	);
}
