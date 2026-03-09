import "@testing-library/jest-dom/extend-expect"
import React from "react"
import {cleanup, render, screen, waitFor} from "@testing-library/react"

import ChatMessages from "../ChatMessages"
import axios from "axios"

jest.mock("axios")

const baseMessages = [
	{id: 1, author: "alice", time: "01.01.2025 10:00", text: "Hi"},
]

let scrollTopCalls = []
let scrollHeightValue = 0

const originalScrollTopDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "scrollTop")
const originalScrollHeightDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "scrollHeight")

beforeAll(() => {
	Object.defineProperty(HTMLElement.prototype, "scrollTop", {
		get() {
			return this.__scrollTopValue || 0
		},
		set(value) {
			this.__scrollTopValue = value
			scrollTopCalls.push(value)
		},
		configurable: true,
	})

	Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
		get() {
			return scrollHeightValue
		},
		configurable: true,
	})
})

afterAll(() => {
	if (originalScrollTopDescriptor) {
		Object.defineProperty(HTMLElement.prototype, "scrollTop", originalScrollTopDescriptor)
	}
	if (originalScrollHeightDescriptor) {
		Object.defineProperty(HTMLElement.prototype, "scrollHeight", originalScrollHeightDescriptor)
	}
})

beforeEach(() => {
	axios.get.mockReset()
	scrollTopCalls = []
	scrollHeightValue = 0
})

afterEach(() => {
	cleanup()
})

describe("ChatMessages realtime updates", () => {
	it("renders messages fetched from the server", async () => {
		axios.get.mockResolvedValue({data: {messages: baseMessages}})

		render(<ChatMessages chatId={123} realtimeMessage={null} />)

		await waitFor(() => {
			expect(axios.get).toHaveBeenCalledWith(
				`${window.location.origin}/api/chats/123`,
				expect.objectContaining({params: {limit: 30}})
			)
		})
		expect(await screen.findByText("Hi")).toBeInTheDocument()
	})

	it("appends realtime message for the active chat", async () => {
		axios.get.mockResolvedValue({data: {messages: baseMessages}})

		const {rerender} = render(<ChatMessages chatId={1} realtimeMessage={null} />)

		await screen.findByText("Hi")

		const realtimeMessage = {
			chatId: 1,
			message: {id: 2, author: "bob", time: "01.01.2025 10:01", text: "Realtime"},
		}

		rerender(<ChatMessages chatId={1} realtimeMessage={realtimeMessage} />)

		await screen.findByText("Realtime")
		expect(screen.getAllByText("Realtime")).toHaveLength(1)
	})

	it("ignores realtime payloads for other chats", async () => {
		axios.get.mockResolvedValue({data: {messages: baseMessages}})

		const {rerender} = render(<ChatMessages chatId={5} realtimeMessage={null} />)

		await screen.findByText("Hi")

		const realtimeMessage = {
			chatId: 6,
			message: {id: 2, author: "bob", time: "01.01.2025 10:01", text: "Not this chat"},
		}

		rerender(<ChatMessages chatId={5} realtimeMessage={realtimeMessage} />)

		expect(screen.queryByText("Not this chat")).not.toBeInTheDocument()
	})

	it("does not re-fetch chat history when a realtime message arrives", async () => {
		axios.get.mockResolvedValue({data: {messages: baseMessages}})

		const {rerender} = render(<ChatMessages chatId={9} realtimeMessage={null} />)

		await screen.findByText("Hi")
		expect(axios.get).toHaveBeenCalledTimes(1)

		const realtimeMessage = {
			chatId: 9,
			message: {id: 2, author: "dave", time: "01.01.2025 10:11", text: "solo"},
		}

		rerender(<ChatMessages chatId={9} realtimeMessage={realtimeMessage} />)

		await screen.findByText("solo")
		expect(axios.get).toHaveBeenCalledTimes(1)
	})
})

describe("ChatMessages scroll behavior", () => {
	it("scrolls to bottom after initial load", async () => {
		scrollHeightValue = 150
		axios.get.mockResolvedValue({data: {messages: baseMessages}})

		render(<ChatMessages chatId={1} realtimeMessage={null} />)

		await screen.findByText("Hi")
		await waitFor(() => {
			expect(scrollTopCalls.length).toBeGreaterThan(0)
			expect(scrollTopCalls[0]).toBe(150)
		})
	})

	it("scrolls to bottom when a realtime message arrives", async () => {
		scrollHeightValue = 200
		axios.get.mockResolvedValue({data: {messages: baseMessages}})

		const {rerender} = render(<ChatMessages chatId={1} realtimeMessage={null} />)

		await screen.findByText("Hi")
		const initialCalls = scrollTopCalls.length

		scrollHeightValue = 300
		const realtimeMessage = {
			chatId: 1,
			message: {id: 3, author: "carol", time: "01.01.2025 10:02", text: "Next"},
		}

		rerender(<ChatMessages chatId={1} realtimeMessage={realtimeMessage} />)

		await screen.findByText("Next")
		await waitFor(() => {
			expect(scrollTopCalls.length).toBeGreaterThan(initialCalls)
			expect(scrollTopCalls[scrollTopCalls.length - 1]).toBe(300)
		})
	})
})
