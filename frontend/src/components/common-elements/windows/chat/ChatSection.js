import React, {useState} from "react"
import Chat from "./Chat"
import "./style/chat.css"

const ChatSection = () => {
	const [visible, setVisible] = useState(false)

	return (
		<>
			{visible && (
				<div className="chat-modal-overlay">
					<Chat onClose={() => setVisible(false)} />
				</div>
			)}
			<div className="chat-section" id="chat_btn" onClick={() => setVisible(true)} data-type="chat">
				<i className="el-icon-message"></i>
			</div>
		</>
	)
}

export default ChatSection
