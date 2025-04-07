import { useState } from "react";
import Header from "./components/Header";
import EventSearch from "./components/EventSearch";

function App() {
	const [user, setUser] = useState(null);

	return (
		<>
			<Header onLogin={setUser} />
			<EventSearch loggedInUser={user} />
		</>
	);
}

export default App;
