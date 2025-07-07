import { useState, useEffect, useRef } from "react";
import moment from "moment";
import websocketService from "./services/websockets.service";

//redux
import { useSelector } from "react-redux";

//tools
import { $static } from "./tools/helpers";

//icons
import Background from "./assets/chat-background.svg";
import EmojiIcon from "./assets/emoji-icon.svg";
import GreenMicrophone from "./assets/green-microphone.svg";
import GreyCross from "./assets/grey-cross.svg";
import Basket from "./assets/basket.svg";
import AiChatAvatar from "./assets/ai-chat-avatar.svg";

//styles
import styles from "./App.module.css";

function App() {
	const [messages, setMessages] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [isConnected, setIsConnected] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const productsCount = useSelector((state) => state.basket.productsCount);

	const inputRef = useRef(null);

	useEffect(() => {
		const loadHistory = async () => {
			try {
				const historyResult = await websocketService.fetchHistory();
				if (historyResult.success && historyResult.messages) {
					setMessages(historyResult.messages);
				}
			} catch (error) {
				console.error("Failed to load chat history:", error);
			} finally {
				setIsLoading(false);
			}
		};

		loadHistory();
	}, []);

	useEffect(() => {
		const handleConnected = () => {
			setIsConnected(true);
			console.log("WebSocket connected");
		};

		const handleDisconnected = (reason) => {
			setIsConnected(false);
			console.log("WebSocket disconnected:", reason);
		};

		const handleAiResponse = (data) => {
			const newMessage = {
				id: Date.now(),
				author: "Carlos",
				avatar: AiChatAvatar,
				text: typeof data === "string" ? data : JSON.stringify(data),
				audio: null,
				replyTo: null,
				created_at: new Date().toISOString(),
			};
			setMessages((prev) => [...prev, newMessage]);
		};

		const handleAiError = (data) => {
			const errorMessage = {
				id: Date.now(),
				author: "Carlos",
				avatar: AiChatAvatar,
				text: `Error: ${JSON.stringify(data)}`,
				audio: null,
				replyTo: null,
				created_at: new Date().toISOString(),
			};
			setMessages((prev) => [...prev, errorMessage]);
		};

		const handleMessageSaved = (data) => {
			console.log("Message saved:", data);
		};

		websocketService.on("connected", handleConnected);
		websocketService.on("disconnected", handleDisconnected);
		websocketService.on("ai_question_result", handleAiResponse);
		websocketService.on("ai_error", handleAiError);
		websocketService.on("message_saving_result", handleMessageSaved);

		websocketService.connect();

		return () => {
			websocketService.off("connected", handleConnected);
			websocketService.off("disconnected", handleDisconnected);
			websocketService.off("ai_question_result", handleAiResponse);
			websocketService.off("ai_error", handleAiError);
			websocketService.off("message_saving_result", handleMessageSaved);
		};
	}, []);

	const handleSendMessage = () => {
		if (!inputValue.trim() || !isConnected) return;

		const userMessage = {
			id: Date.now(),
			text: inputValue,
			type: "user",
			current_user: true,
			reply_to: null,
			created_at: new Date().toISOString(),
		};

		setMessages((prev) => [...prev, userMessage]);

		websocketService.sendMessage({
			text: inputValue,
		});

		setInputValue("");
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			handleSendMessage();
		}
	};

	return (
		<div
			className={styles.container}
			style={{ "--bg-image": `url(${$static(Background)})` }}>
			<div className={styles["top-triangle"]}></div>
			<div className={styles["top-controls-container"]}>
				<div className={styles["basket-container"]}>
					<img
						src={Basket}
						alt='Basket'
						className={styles["basket-icon"]}
					/>
					<span className={styles["basket-count"]}>{productsCount}</span>
				</div>
				<img
					src={GreyCross}
					alt='Close'
					className={styles["close-icon"]}
				/>
			</div>

			<div className={styles["messages-container"]}>
				{isLoading ? (
					<div className={styles["loading"]}>Loading chat history...</div>
				) : (
					messages.map((message) => (
						<div
							key={message.id}
							className={`${styles["message"]} ${
								message.current_user ? styles["message-user"] : ""
							}`}>
							{message.type === "bot" && !message.current_user && (
								<img
									src={$static(AiChatAvatar)}
									alt='AI Avatar'
									className={styles["chat-avatar"]}
								/>
							)}
							<div
								className={`${styles["message-content"]} ${
									message.current_user ? styles["message-content-user"] : ""
								}`}>
								<div
									className={`${styles["message-triangle"]} ${
										message.current_user ? styles["message-triangle-user"] : ""
									}`}></div>
								<span className={styles["message-author"]}>
									{message.type === "bot"
										? "Carlos"
										: message.current_user
										? "You"
										: message.author_name || "User"}
								</span>
								{message.reply_to && (
									<div className={styles["reply-container"]}>
										<span className={styles["reply-author"]}>
											{message.reply_to.type === "bot"
												? "Carlos"
												: message.reply_to.current_user
												? "You"
												: message.reply_to.author_name || "User"}
										</span>
										<span className={styles["reply-text"]}>
											{typeof message.reply_to.text === "string"
												? message.reply_to.text
												: JSON.stringify(message.reply_to.text)}
										</span>
									</div>
								)}
								<div className={styles["message-text-container"]}>
									<span className={styles["message-text"]}>
										{typeof message.text === "string"
											? message.text
											: JSON.stringify(message.text)}
									</span>
									<span className={styles["message-time"]}>
										{message.created_at
											? moment(message.created_at).format("HH:mm")
											: ""}
									</span>
								</div>
							</div>
						</div>
					))
				)}
			</div>

			<div className={styles["bottom-controls-container"]}>
				<div className={styles["message-input-container"]}>
					<img
						src={EmojiIcon}
						alt='Logo'
						className={styles["emoji-icon"]}
					/>
					<input
						ref={inputRef}
						type='text'
						placeholder='Message'
						className={styles["message-input"]}
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onKeyPress={handleKeyPress}
						disabled={!isConnected}
					/>
				</div>
				<img
					src={GreenMicrophone}
					alt='Microphone'
					className={styles["microphone-icon"]}
				/>
			</div>
		</div>
	);
}

export default App;
