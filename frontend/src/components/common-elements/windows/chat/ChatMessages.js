import React, {useCallback, useEffect, useRef, useState} from "react"
import axios from "axios"
import "./style/chat.css"
import {specialtagstohtml} from "../../form/elements/editor/TextEditor"

const PAGE_SIZE = 30

const ChatMessages = ({chatId, realtimeMessage}) => {
	const [messages, setMessages] = useState([])
	const [status, setStatus] = useState("idle")
	const [hasMore, setHasMore] = useState(true)
	const [earliestMessageId, setEarliestMessageId] = useState(null)
	const [loadingMore, setLoadingMore] = useState(false)
	const containerRef = useRef(null)
	const skipAutoScroll = useRef(false)

	const fetchMessages = useCallback(async (beforeId = null) => {
		const params = {limit: PAGE_SIZE}
		if (beforeId) {
			params.before = beforeId
		}
		const response = await axios.get(`${window.location.origin}/api/chats/${chatId}`, {params})
		return response.data
	}, [chatId])

	useEffect(() => {
		if (!chatId) {
			setMessages([])
			setStatus("idle")
			setHasMore(true)
			setEarliestMessageId(null)
			return
		}

		let isMounted = true
		setStatus("loading")
		setHasMore(true)
		setEarliestMessageId(null)
		skipAutoScroll.current = false

		fetchMessages()
			.then((data) => {
				if (!isMounted) {
					return
				}
				const fetched = Array.isArray(data?.messages) ? data.messages : []
				setMessages(fetched)
				setHasMore(Boolean(data?.has_more))
				setEarliestMessageId(fetched[0]?.id || null)
				setStatus("loaded")
			})
			.catch(() => {
				if (!isMounted) {
					return
				}
				setMessages([])
				setStatus("error")
				setHasMore(false)
			})

		return () => {
			isMounted = false
		}
	}, [chatId, fetchMessages])

	const loadOlderMessages = useCallback(async () => {
		if (!chatId || loadingMore || !hasMore || !earliestMessageId) {
			return
		}
		const node = containerRef.current
		const prevHeight = node?.scrollHeight || 0
		setLoadingMore(true)
		skipAutoScroll.current = true

		try {
			const data = await fetchMessages(earliestMessageId)
			const older = Array.isArray(data?.messages) ? data.messages : []
			if (!older.length) {
				setHasMore(false)
				return
			}
			setMessages((prev) => [...older, ...prev])
			setEarliestMessageId(older[0]?.id || earliestMessageId)
			setHasMore(Boolean(data?.has_more))
			if (node) {
				requestAnimationFrame(() => {
					node.scrollTop = node.scrollHeight - prevHeight
				})
			}
		} catch (error) {
			console.error("Не удалось загрузить старые сообщения", error)
		} finally {
			setLoadingMore(false)
		}
	}, [chatId, earliestMessageId, fetchMessages, hasMore, loadingMore])

	useEffect(() => {
		const node = containerRef.current
		if (!node) {
			return
		}
		const onScroll = () => {
			if (node.scrollTop <= 20) {
				loadOlderMessages()
			}
		}
		node.addEventListener("scroll", onScroll)
		return () => {
			node.removeEventListener("scroll", onScroll)
		}
	}, [loadOlderMessages])

	useEffect(() => {
		const node = containerRef.current
		if (!node) {
			return
		}
		if (!skipAutoScroll.current) {
            setTimeout(() => {
                node.scrollTop = node.scrollHeight
            }, 10)
		} else {
			skipAutoScroll.current = false
		}
	}, [chatId, messages])

	useEffect(() => {
		if (!realtimeMessage || realtimeMessage.chatId !== chatId) {
			return
		}

		setMessages((prev) => {
			const exists = prev.some((message) => message.id === realtimeMessage.message.id)
			if (exists) {
				return prev
			}
			return [...prev, realtimeMessage.message]
		})
	}, [chatId, realtimeMessage])

	const prepareMarkup = (text) => {
		const html = specialtagstohtml(text) || ""
		return html.replace(/\n/g, "<br/>")
	}

	const renderContent = () => {
		if (!chatId) {
			return <div className="chat-window__empty">Выберите чат, чтобы увидеть переписку</div>
		}

		if (status === "loading") {
			return <p className="chat-window__status"></p>
		}

		if (status === "error") {
			return <p className="chat-window__status chat-window__status_error">Не удалось загрузить сообщения</p>
		}

		if (!messages.length) {
			return <p className="chat-window__status">В этом чате пока нет сообщений</p>
		}

		return messages.map((message, index) => (
			<article className="chat-message" key={`${chatId}-${message.id || index}`}>
				<div className="chat-message__meta">
					<span className="chat-message__author">{message.author}</span>
					<span className="chat-message__time">{message.time}</span>
				</div>
				<div
					className="chat-message__text"
					dangerouslySetInnerHTML={{__html: prepareMarkup(message.text)}}
				/>
			</article>
		))
	}

	return (
		<div className="chat-window__messages" ref={containerRef}>
			{renderContent()}
		</div>
	)
}

export default ChatMessages
