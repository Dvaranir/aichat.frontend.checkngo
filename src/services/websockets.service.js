class WebSocketService {
	constructor() {
		this.socket = null;
		this.callbacks = {};
		this.isConnected = false;
	}

	getCookie(name) {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(";").shift();
		return null;
	}

	getSocketDomain() {
		let sockets_domain = '';

		if (window.location.hostname.includes('dev-app')) {
			sockets_domain = window.location.hostname.split('-')[0] + '-dev-websocket.checkngo.link';
		} else if (window.location.hostname.includes('qa-app')){
			sockets_domain = 'qa-websocket.checkngo.link';
		}

		return `wss://${sockets_domain}:2183`;
	}

	register() {
		const userGuid = this.getCookie("__cng_user_guid");
		const sessionGuid = window.__cng_common?.table_session_guid;
		
		if (sessionGuid && userGuid) {
			this.socket.emit("register", JSON.stringify({ sessionGuid, userGuid }));
			console.log("Registration sent");
		} else {
			console.error("Session GUID or User GUID not found in cookies.");
		}
	}

	connect() {
		if (this.socket && this.isConnected) {
			return Promise.resolve();
		}

		const socketsDomain = this.getSocketDomain();

		this.socket = io(socketsDomain, {
			secure: true,
			transports: ["websocket", "polling"],
			timeout: 20000,
			forceNew: true,
			reconnection: true,
			reconnectionAttempts: 5,
			reconnectionDelay: 1000,
			auth: {
				cookies: document.cookie,
			},
		});

		this.socket.on("connect", () => {
			this.isConnected = true;
			this.register();
			this.emit('connected');
		});

		this.socket.on("disconnect", (reason) => {
			this.isConnected = false;
			console.log("Disconnected:", reason);
			this.emit('disconnected', reason);
		});

		this.socket.on("ai_question_result", (data) => {
			this.emit('ai_question_result', data);
		});

		this.socket.on("ai_error", (data) => {
			this.emit('ai_error', data);
		});

		this.socket.on("message_saving_result", (data) => {
			this.emit('message_saving_result', data);
		});

		this.socket.on("registered", (data) => {
			console.log("Registered:", data);
			this.emit('registered', data);
		});

		return new Promise((resolve) => {
			this.socket.on("connect", resolve);
		});
	}

	sendMessage(params) {
        
		if (this.socket && this.isConnected) {
            console.log("Sending message:", params);
			this.socket.emit("send_message", JSON.stringify(params));
		} else {
			console.error("Socket not connected");
		}
	}

	sendMessageWithAudio(messageText, audioBlob) {
		const formData = new FormData();
		formData.append("audio", audioBlob, "recording.wav");
		formData.append("transcribe", true);

		return new Promise((resolve, reject) => {
			if (!window.__cng_common) {
				reject(new Error("__cng_common not available"));
				return;
			}

			window.__cng_common.ajax_call("POST", "/enp/audio_upload", (data) => {
				try {
					const result = JSON.parse(data);
					const params = {};

					if (result.success && result.transcription) {
						params.text = `${messageText} ${result.transcription}`.trim();
					} else {
						params.text = messageText.trim();
					}

					if (result.audio_id) {
						params.audioId = result.audio_id;
					}

					this.sendMessage(params);
					resolve(result);
				} catch (error) {
					reject(error);
				}
			}, formData);
		});
	}

	fetchHistory() {
		return new Promise((resolve, reject) => {
			if (!window.__cng_common) {
				reject(new Error("__cng_common not available"));
				return;
			}

			const sessionGuid = window.__cng_common?.table_session_guid;
			if (!sessionGuid) {
				reject(new Error("table_session_guid not found"));
				return;
			}

			const params = `tsguid=${encodeURIComponent(sessionGuid)}`;

			window.__cng_common.ajax_call("GET", `/enp/ai_chat/get_history?${params}`, (data) => {
				try {
					const result = JSON.parse(data);
					resolve(result);
				} catch (error) {
					reject(error);
				}
			});
		});
	}

	on(event, callback) {
		if (!this.callbacks[event]) {
			this.callbacks[event] = [];
		}
		this.callbacks[event].push(callback);
	}

	off(event, callback) {
		if (this.callbacks[event]) {
			this.callbacks[event] = this.callbacks[event].filter(cb => cb !== callback);
		}
	}

	emit(event, data) {
		if (this.callbacks[event]) {
			this.callbacks[event].forEach(callback => callback(data));
		}
	}

	disconnect() {
		if (this.socket) {
			this.socket.disconnect();
			this.socket = null;
			this.isConnected = false;
		}
	}
}

export default new WebSocketService();
