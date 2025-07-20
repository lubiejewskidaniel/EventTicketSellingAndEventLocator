import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";

// it is main part of my app which will render App.jsx when app started
createRoot(document.getElementById("root")).render(
	<StrictMode>
		<App />
	</StrictMode>
);
