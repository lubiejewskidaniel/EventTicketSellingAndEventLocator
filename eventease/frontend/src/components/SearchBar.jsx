// This component is used to let the user type in a city name and click a button
// to search for events in that city. It has an input box where the user can type
//  (like “London”), and a search button next to it. When the user types,
//  the setLocation function updates the value, and when they click the button, it
//  runs the searchEvents function. The styles are passed in as props to keep things
//  looking nice. This component just handles the top part of the page
//  where the user starts their search.

export default function SearchBar({
	location,
	setLocation,
	searchEvents,
	styles,
}) {
	return (
		<div style={styles.form}>
			<input
				type="text"
				placeholder="Enter City (example: London)"
				value={location}
				onChange={(event) => setLocation(event.target.value)}
				style={styles.input}
			/>
			<button
				onClick={searchEvents}
				style={{ ...styles.button, ...styles.searchButton }}
			>
				Search
			</button>
		</div>
	);
}
