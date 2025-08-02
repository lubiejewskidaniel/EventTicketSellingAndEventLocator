// This component is  used to show the available ticket types for an event.
// It takes a list of tickets as a prop and displays each one with its type
// price, and how many are still available. If there are no tickets,
// it doesn’t show anything. The tickets are shown in a simple list using styles that are also passed in.
// This component helps the user quickly see their options before booking.

export default function TicketInfo({ tickets, styles }) {
	if (!tickets || tickets.length === 0) return null;

	return (
		<div>
			<strong>Tickets:</strong>
			<ul style={styles.listNoBullets}>
				{tickets.map((ticket) => (
					<li key={ticket.ticketType}>
						{ticket.ticketType} – £{ticket.price} – {ticket.availability} left
					</li>
				))}
			</ul>
		</div>
	);
}
