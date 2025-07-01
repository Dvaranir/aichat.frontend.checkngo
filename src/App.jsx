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
				<div className={styles["message"]}>
					<img
						src={$static(AiChatAvatar)}
						alt='Person Avatar'
						className={styles["chat-avatar"]}
					/>
					<div className={styles["message-content"]}>
						<div className={styles['message-triangle']}></div>
						<span className={styles["message-author"]}>Carlos</span>
						<div className={styles["reply-container"]}>
							<span className={styles["reply-author"]}>You</span>
							<span className={styles["reply-text"]}>I would like to have something local, typical and refreshing.</span>
						</div>
						<audio
							className={styles["message-audio"]}
							src='https://yp-dev-chat.checkngo.link:7072/audio/sample-audio.mp3'>
							Your browser does not support the audio element.
						</audio>
						<span className={styles["message-text"]}>
							My best recommendation for you will be to have a glass of Tinto de
							Verano , which is a local cocktail based on red wine, oranges and
							herbs. If you are not that hungry, you may accompany your cocktail
							with Tomato and Garlic Bread and the Selection of Olives .
						</span>
					</div>
				</div>
				<div className={styles["message"]}>
					<img
						src={$static(AiChatAvatar)}
						alt='Person Avatar'
						className={styles["chat-avatar"]}
					/>
					<div className={styles["message-content"]}>
						<div className={styles['message-triangle']}></div>
						<span className={styles["message-author"]}>Carlos</span>
						<div className={styles["reply-container"]}>
							<span className={styles["reply-author"]}>You</span>
							<span className={styles["reply-text"]}>I would like to have something local, typical and refreshing.</span>
						</div>
						<audio
							className={styles["message-audio"]}
							src='https://yp-dev-chat.checkngo.link:7072/audio/sample-audio.mp3'>
							Your browser does not support the audio element.
						</audio>
						<span className={styles["message-text"]}>
							My best recommendation for you will be to have a glass of Tinto de
							Verano , which is a local cocktail based on red wine, oranges and
							herbs. If you are not that hungry, you may accompany your cocktail
							with Tomato and Garlic Bread and the Selection of Olives .
						</span>
					</div>
				</div>
				<div className={styles["message"]}>
					<img
						src={$static(AiChatAvatar)}
						alt='Person Avatar'
						className={styles["chat-avatar"]}
					/>
					<div className={styles["message-content"]}>
						<div className={styles['message-triangle']}></div>
						<span className={styles["message-author"]}>Carlos</span>
						<div className={styles["reply-container"]}>
							<span className={styles["reply-author"]}>You</span>
							<span className={styles["reply-text"]}>I would like to have something local, typical and refreshing.</span>
						</div>
						<audio
							className={styles["message-audio"]}
							src='https://yp-dev-chat.checkngo.link:7072/audio/sample-audio.mp3'>
							Your browser does not support the audio element.
						</audio>
						<span className={styles["message-text"]}>
							My best recommendation for you will be to have a glass of Tinto de
							Verano , which is a local cocktail based on red wine, oranges and
							herbs. If you are not that hungry, you may accompany your cocktail
							with Tomato and Garlic Bread and the Selection of Olives .
						</span>
					</div>
				</div>
				<div className={styles["message"]}>
					<img
						src={$static(AiChatAvatar)}
						alt='Person Avatar'
						className={styles["chat-avatar"]}
					/>
					<div className={styles["message-content"]}>
						<div className={styles['message-triangle']}></div>
						<span className={styles["message-author"]}>Carlos</span>
						<div className={styles["reply-container"]}>
							<span className={styles["reply-author"]}>You</span>
							<span className={styles["reply-text"]}>I would like to have something local, typical and refreshing.</span>
						</div>
						<audio
							className={styles["message-audio"]}
							src='https://yp-dev-chat.checkngo.link:7072/audio/sample-audio.mp3'>
							Your browser does not support the audio element.
						</audio>
						<span className={styles["message-text"]}>
							My best recommendation for you will be to have a glass of Tinto de
							Verano , which is a local cocktail based on red wine, oranges and
							herbs. If you are not that hungry, you may accompany your cocktail
							with Tomato and Garlic Bread and the Selection of Olives .
						</span>
					</div>
				</div>
				<div className={styles["message"]}>
					<img
						src={$static(AiChatAvatar)}
						alt='Person Avatar'
						className={styles["chat-avatar"]}
					/>
					<div className={styles["message-content"]}>
						<div className={styles['message-triangle']}></div>
						<span className={styles["message-author"]}>Carlos</span>
						<div className={styles["reply-container"]}>
							<span className={styles["reply-author"]}>You</span>
							<span className={styles["reply-text"]}>I would like to have something local, typical and refreshing.</span>
						</div>
						<audio
							className={styles["message-audio"]}
							src='https://yp-dev-chat.checkngo.link:7072/audio/sample-audio.mp3'>
							Your browser does not support the audio element.
						</audio>
						<span className={styles["message-text"]}>
							My best recommendation for you will be to have a glass of Tinto de
							Verano , which is a local cocktail based on red wine, oranges and
							herbs. If you are not that hungry, you may accompany your cocktail
							with Tomato and Garlic Bread and the Selection of Olives .
						</span>
					</div>
				</div>
			</div>

			<div className={styles["bottom-controls-container"]}>
				<div className={styles["message-input-container"]}>
					<img
						src={EmojiIcon}
						alt='Logo'
						className={styles["emoji-icon"]}
					/>
					<input
						type='text'
						placeholder='Message'
						className={styles["message-input"]}
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
