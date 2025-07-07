import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./store/index.js";
import { storeAPI } from "./store/api.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";

function renderApp(elementId = "cng_ai_chat") {
	const element = document.getElementById(elementId);
	if (!element) {
		console.error(`Element with id "${elementId}" not found`);
		return null;
	}

	const root = createRoot(element);
	root.render(
		<StrictMode>
			<Provider store={store}>
				<App />
			</Provider>
		</StrictMode>
	);
	return root;
}

if (typeof window !== "undefined") {
	window.renderCngAiChat = renderApp;
	window.cngAiChatStore = storeAPI;

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", () => renderApp());
	} else {
		renderApp();
	}
}

export { renderApp, storeAPI };
