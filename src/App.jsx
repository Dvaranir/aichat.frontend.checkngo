import { useState, useEffect, useRef } from "react";
import websocketService from "./services/websockets.service";

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
	const [messages, setMessages] = useState([
		{
			id: 1,
			author: "Carlos",
			avatar: AiChatAvatar,
			text: "My best recommendation for you will be to have a glass of Tinto de Verano , which is a local cocktail based on red wine, oranges and herbs. If you are not that hungry, you may accompany your cocktail with Tomato and Garlic Bread and the Selection of Olives .",
			replyTo: {
				author: "You",
				text: "I would like to have something local, typical and refreshing."
			},
			audio: "https://yp-dev-chat.checkngo.link:7072/audio/sample-audio.mp3"
		}
	]);
	const [inputValue, setInputValue] = useState("");
	const [isConnected, setIsConnected] = useState(false);
	const inputRef = useRef(null);

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
				text: JSON.stringify(data),
				audio: null,
				replyTo: null
			};
			setMessages(prev => [...prev, newMessage]);
		};

		const handleAiError = (data) => {
			const errorMessage = {
				id: Date.now(),
				author: "Carlos",
				avatar: AiChatAvatar,
				text: `Error: ${JSON.stringify(data)}`,
				audio: null,
				replyTo: null
			};
			setMessages(prev => [...prev, errorMessage]);
		};

		const handleMessageSaved = (data) => {
			console.log("Message saved:", data);
		};

		websocketService.on('connected', handleConnected);
		websocketService.on('disconnected', handleDisconnected);
		websocketService.on('ai_question_result', handleAiResponse);
		websocketService.on('ai_error', handleAiError);
		websocketService.on('message_saving_result', handleMessageSaved);

		websocketService.connect();

		return () => {
			websocketService.off('connected', handleConnected);
			websocketService.off('disconnected', handleDisconnected);
			websocketService.off('ai_question_result', handleAiResponse);
			websocketService.off('ai_error', handleAiError);
			websocketService.off('message_saving_result', handleMessageSaved);
		};
	}, []);

	const handleSendMessage = () => {
		if (!inputValue.trim() || !isConnected) return;

		const userMessage = {
			id: Date.now(),
			author: "You",
			avatar: null,
			text: inputValue,
			audio: null,
			replyTo: null
		};

		setMessages(prev => [...prev, userMessage]);

		websocketService.sendMessage({
			text: inputValue
		});

		setInputValue("");
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleSendMessage();
		}
	};

	return (
		<div
			className={styles.container}
			style={{ "--bg-image": `url(${$static(Background)})` }}>
			<div className={styles['top-triangle']}></div>
			<div className={styles["top-controls-container"]}>
				<div className={styles["basket-container"]}>
					<img
						src={Basket}
						alt='Basket'
						className={styles["basket-icon"]}
					/>
					<span className={styles["basket-count"]}>0</span>
				</div>
				<img
					src={GreyCross}
					alt='Close'
					className={styles["close-icon"]}
				/>
			</div>

			<div className={styles["messages-container"]}>
				{messages.map((message) => (
					<div key={message.id} className={styles["message"]}>
						{message.avatar && (
							<img
								src={$static(message.avatar)}
								alt='Person Avatar'
								className={styles["chat-avatar"]}
							/>
						)}
						<div className={styles["message-content"]}>
							<div className={styles['message-triangle']}></div>
							<span className={styles["message-author"]}>{message.author}</span>
							{message.replyTo && (
								<div className={styles["reply-container"]}>
									<span className={styles["reply-author"]}>{message.replyTo.author}</span>
									<span className={styles["reply-text"]}>{message.replyTo.text}</span>
								</div>
							)}
							{message.audio && (
								<audio
									className={styles["message-audio"]}
									src={message.audio}>
									Your browser does not support the audio element.
								</audio>
							)}
							<span className={styles["message-text"]}>
								{message.text}
							</span>
						</div>
					</div>
				))}
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
