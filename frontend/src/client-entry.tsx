import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import invariant from "tiny-invariant";

import {App} from "./App.js";

const init = () => {
	const rootElement = document.getElementById("root");
	invariant(rootElement, "Root element not found");

	createRoot(rootElement).render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
};

init();
