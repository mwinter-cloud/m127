import React, {useEffect, useMemo, useState, useRef} from "react"
import {useSelector} from "react-redux"
import axios from "axios"
import ConfirmWindow from "../ConfirmWindow"
import "./style/chat.css"
import SmileBlock from "../../form/elements/editor/SmileBlock"
import ChatMessages from "./ChatMessages"
import {getCsrfToken} from "../../../../special-functions/csrf"

const fetchChats = () => axios.get(`${window.location.origin}/api/chats`)

const getChatParticipant = (participants = [], currentProfileId) => {
	return (
		(participants && participants.find((p) => p.id !== currentProfileId)) ||
		(participants && participants[0]) ||
		{}
	)
}

const getChatTitle = (chat, currentProfileId) => {
	const participant = getChatParticipant(chat?.participants, currentProfileId)
	return participant.name || "Чат"
}

const Chat = ({onClose}) => {
	const [activeId, setActiveId] = useState(null)
	const [chatList, setChatList] = useState([])
	const [confirmOpenFor, setConfirmOpenFor] = useState(null)
	const [smilesSection, setSmilesSection] = useState("smiles")
	const [showSmilePanel, setShowSmilePanel] = useState(false)
	const inputRef = useRef(null)
	const socketRef = useRef(null)
	const [incomingMessage, setIncomingMessage] = useState(null)
	const currentProfileId = useSelector((state) => state.member?.profile?.id)

	useEffect(() => {
		const prevOverflow = document.body.style.overflow
		document.body.style.overflow = "hidden"
		return () => {
			document.body.style.overflow = prevOverflow || ""
		}
	}, [])

	useEffect(() => {
		fetchChats().then(({data}) => {
			setChatList(data)
			if (data.length) {
				setActiveId(data[0].id)
			}
		}).catch(() => {
			// fallback: keep existing chats empty
		})
	}, [])

	useEffect(() => {
		if (!activeId) {
			if (socketRef.current) {
				socketRef.current.close()
				socketRef.current = null
			}
			return
		}

		setIncomingMessage(null)

		const wsProtocol = window.location.protocol === "https:" ? "wss://" : "ws://"
		const socketUrl = `${wsProtocol}${window.location.host}/ws/chat/${activeId}`
		const socket = new WebSocket(socketUrl)
		socketRef.current = socket

		const handleMessage = (event) => {
			try {
				const data = JSON.parse(event.data)
				if (data.type === "chat_message" && data.message) {
					setIncomingMessage({chatId: activeId, message: data.message})
				} else if (data.error) {
					console.error("Chat websocket error:", data.error)
				}
			} catch (parseError) {
				console.error("Не удалось обработать websocket-сообщение", parseError)
			}
		}

		const handleError = (event) => {
			console.error("Chat websocket connection error", event)
		}

		const handleClose = () => {
			if (socketRef.current === socket) {
				socketRef.current = null
			}
		}

		socket.addEventListener("message", handleMessage)
		socket.addEventListener("error", handleError)
		socket.addEventListener("close", handleClose)

		return () => {
			socket.removeEventListener("message", handleMessage)
			socket.removeEventListener("error", handleError)
			socket.removeEventListener("close", handleClose)
			socket.close()
			if (socketRef.current === socket) {
				socketRef.current = null
			}
		}
	}, [activeId])

	const closeConfirm = () => setConfirmOpenFor(null)

	const confirmDelete = () => {
		const chatIdToDelete = confirmOpenFor
		if (!chatIdToDelete) {
			closeConfirm()
			return
		}

		const headers = {
			"X-CSRFToken": getCsrfToken(),
		}

		axios.delete(`${window.location.origin}/api/chats/${chatIdToDelete}`, {headers})
			.then(() => {
				setChatList((prev) => {
					const next = prev.filter((chat) => chat.id !== chatIdToDelete)
					if (activeId === chatIdToDelete) {
						setActiveId(next[0]?.id || null)
					}
					return next
				})
			})
			.catch((error) => {
				console.error("Не удалось удалить чат", error)
			})
			.finally(() => {
				closeConfirm()
			})
	}

	const activeChat = useMemo(() => chatList.find((chat) => chat.id === activeId), [activeId, chatList])
	const activeChatName = useMemo(() => getChatTitle(activeChat, currentProfileId), [activeChat, currentProfileId])

	const sendChatMessage = () => {
		if (!activeId) {
			return
		}

		const editable = inputRef.current
		if (!editable) {
			return
		}

		const hasText = editable.innerText?.trim()
		const hasImage = Boolean(editable.querySelector("img"))
		if (!hasText && !hasImage) {
			return
		}

		const encodeContent = (value = "") => value
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")

		const content = encodeContent(editable.innerHTML)

		const socket = socketRef.current
		if (!socket || socket.readyState !== WebSocket.OPEN) {
			console.error("Websocket для чата не готов")
			return
		}

		try {
			socket.send(JSON.stringify({content}))
			editable.innerHTML = ""
			setShowSmilePanel(false)
		} catch (error) {
			console.error("Не удалось отправить сообщение по websocket", error)
		}
	}

	return (
		<div className="chat-window">
			<header className="chat-window__header">
				<div className="chat-window__thread-list">
					{chatList.map((thread) => {
						const participant =
							(thread.participants && thread.participants.find((p) => p.id !== currentProfileId)) ||
							(thread.participants && thread.participants[0]) ||
							{}
						const image = participant.avatar || null
						const name = participant.name || "Чат"
						return (
							<div key={thread.id} className={`chat-window__thread ${thread.id === activeId ? "active" : ""}`}>
								<button
									type="button"
									className="chat-window__thread-btn"
									onClick={() => setActiveId(thread.id)}
								>
									{image != null ?
										(<img src={image} className="avatar"/>) :
										(<div className="base-avatar"></div> )}
									<div>
										<div className="chat-window__name">{name}</div>
									</div>
								</button>
								<button
									type="button"
									className="chat-window__thread-close"
									onClick={() => setConfirmOpenFor(thread.id)}
								>
									<i className="el-icon-close"></i>
								</button>
							</div>
						)
					})}
				</div>
				<button type="button" className="chat-window__close" onClick={onClose}><i className="el-icon-close"></i></button>
			</header>
			<div className="chat-window__body">
				<ChatMessages chatId={activeId} realtimeMessage={incomingMessage}/>
				<div className="chat-window__input">
					<div
						className="chat-input-area"
						contentEditable
						ref={inputRef}
						data-placeholder="Напишите сообщение..."
						onFocus={() => setShowSmilePanel(false)}
					/>
					<div className="chat-window__toolbar">
						<div className="chat-window__smile-wrapper">
							<button
								type="button"
								id="chat_smile_btn"
								onClick={() => setShowSmilePanel((prev) => !prev)}
							><img src="../../../../../../static/frontend/smiles-btn.png" alt="" /></button>
							{showSmilePanel && (
								<div className="chat-smile-panel">
						<div className="chat-smile-tabs">
							<button
								type="button"
								className={`chat-smile-tab ${smilesSection === "smiles" ? "active" : ""}`}
								onClick={() => setSmilesSection("smiles")}
							>
								<span className="chat-smile-tab-label">Смайлики</span>
							</button>
							<button
								type="button"
								className={`chat-smile-tab ${smilesSection === "spotti" ? "active" : ""}`}
								onClick={() => setSmilesSection("spotti")}
							>
								<span className="chat-smile-tab-label">Стикеры</span>
							</button>
						</div>
									<SmileBlock textareaRef={inputRef.current} smilesSection={smilesSection} />
								</div>
							)}
						</div>
						<button
							type="button"
							className="chat-window__send"
							onClick={sendChatMessage}
						>
							<i className="el-icon-position"></i>
						</button>
					</div>
				</div>
			</div>
			{confirmOpenFor && (
				<ConfirmWindow confirmFunc={confirmDelete} close={closeConfirm} />
			)}
		</div>
	)
}

export default Chat
