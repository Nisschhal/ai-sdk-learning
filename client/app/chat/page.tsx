"use client"
import { useState } from "react"
import { DefaultChatTransport } from "ai"
import { useChat } from "@ai-sdk/react"
import ReactMarkdown from "react-markdown"
import Markdown from "react-markdown"

export default function Home() {
  const [prompt, setPrompt] = useState("")

  const {
    messages,
    status,
    error,
    sendMessage,
    stop,
    resumeStream,
    regenerate,
  } = useChat({
    transport: new DefaultChatTransport({
      api: "http://localhost:8000/api/stream-chat-text",
    }), // if not provided it will use auto use 'api/chat' as the default endpoint
  })

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendMessage({ text: prompt })
    setPrompt("")
  }

  return (
    <div className="flex max-w-7xl  mx-auto p-4 flex-col items-between justify-center w-full h-screen">
      <div className="flex flex-1 flex-col gap-2 w-full">
        {error && <p className="text-red-500">{error.message}</p>}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${message.role === "user" ? "text-right" : "text-left"}`}
          >
            <div>{message.role === "user" ? "You: " : "AI: "}</div>
            {message.parts.map((part, index) => {
              switch (part.type) {
                case "text":
                  return (
                    <div key={`${message.id}-${index}`}>
                      <Markdown>{part.text}</Markdown>
                    </div>
                  )
                default:
                  null
              }
            })}
          </div>
        ))}
        {status === "submitted" && (
          <p className="text-gray-500">AI is thinking...</p>
        )}
      </div>
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <input
          className="w-full p-2 rounded-md border border-gray-300"
          type="text"
          name="prompt"
          placeholder="How can I help you today?"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        {status === "streaming" || status === "submitted" ? (
          <button type="button" onClick={() => stop()}>
            Stop
          </button>
        ) : (
          <button type="submit" disabled={status !== "ready"}>
            Send
          </button>
        )}
      </form>
    </div>
  )
}
