// This is a reusable button component for booking tickets.
// It accepts props like ticket type, click handler, style, and optional label text.

export default function BuyTicketButton({ type, onClick, style, label }) {
	return (
		// When the button is clicked, it calls the onClick function
		// and passes the ticket type (e.g., "General", "VIP", etc.)
		<button onClick={() => onClick(type)} style={style}>
			{/* 
        If a custom label is provided, show it.
        Otherwise, use the default text: "Book [type] ticket"
        For example: "Book VIP ticket"
      */}
			{label || `Book ${type} ticket`}
		</button>
	);
}
