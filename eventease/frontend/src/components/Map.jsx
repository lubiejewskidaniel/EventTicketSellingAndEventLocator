import { useEffect } from "react";
import L from "leaflet";

// This component displays a map using Leaflet with event markers I
// used all logic what was provided during this module, pretty simple as
// to know leaflet enough is to learn the basic template
export default function Map({ events }) {
	useEffect(() => {
		const attrib =
			"Map data copyright OpenStreetMap contributors, Open Database Licence";

		// Create the map and show it centered on London as below I set up Londons coordinates
		const map = L.map("map", {
			center: [51.5074, -0.1278],
			zoom: 10,
		});

		// Below is added OpenStreetMap, tha map graphics
		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
		}).addTo(map);

		// Loop through each event and place a marker on the map
		// I converted coordinates tu number to avoid any issues
		events.forEach((event) => {
			const lat = Number(event.lat);
			const lon = Number(event.lon);

			// Marker is added only if coordinates are valid
			if (!isNaN(lat) && !isNaN(lon)) {
				// dsplays marker on the map
				const marker = L.marker([lat, lon]).addTo(map);

				// Below is pop up information on the marker
				const popupContent = `
					<strong>${event.name}</strong><br/>
					${event.description || "In progress"}<br/>
					Date: ${event.date || "No date"}
				`;

				// binding marker and pop up to work together
				marker.bindPopup(popupContent);
			}
		});

		// Clean up the map when the component is removed from the page
		return () => {
			map.remove();
		};
	}, [events]);

	// Container div - map will be filled by leaflet in there
	return (
		<div
			id="map"
			style={{
				height: "350px",
				width: "100%",
				marginTop: "30px",
				border: "2px solid #ccc",
				borderRadius: "10px",
				boxShadow: "0 6px 12px rgba(0, 0, 0, 1.86)",
			}}
		></div>
	);
}
