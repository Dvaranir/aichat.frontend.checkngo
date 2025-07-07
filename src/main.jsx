//react
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

//redux
import { store } from "./store/index.js";
import { storeAPI } from "./store/api.js";
import { Provider } from "react-redux";

//tools
import { $static } from "./tools/helpers";

//components
import App from "./App.jsx";

//icons
import AiChatAvatar from "./assets/ai-chat-avatar.svg";

//styles
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

	const aiChatAvatarHeadingSection = document.getElementById("ai_chat_avatar_heading_section");

	if (aiChatAvatarHeadingSection) {
		const aiChatAvatarDom = document.createElement("img");
		aiChatAvatarHeadingSection.appendChild(aiChatAvatarDom);
		aiChatAvatarDom.id = "cng_ai_chat_avatar";
		aiChatAvatarDom.src = $static(AiChatAvatar);
		aiChatAvatarDom.alt = "AI Chat Avatar";
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", () => renderApp());
	} else {
		renderApp();
	}
}

export { renderApp, storeAPI };
