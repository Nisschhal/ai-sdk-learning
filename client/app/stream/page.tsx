"use client"
import ReactMarkdown from "react-markdown"
import { useChat, useCompletion } from "@ai-sdk/react"
import Markdown from "react-markdown"

export default function Home() {
  const {
    completion,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    setInput,
    stop,
  } = useCompletion({
    api: "http://localhost:8000/api/stream-text",
    // streamProtocol: "text",
  })
  // const {
  //   completion,
  //   input,
  //   handleInputChange,
  //   handleSubmit,
  //   isLoading,
  //   error,
  //   setInput,
  //   stop,
  // } = useCompletion({
  //   api: "http://localhost:8000/api/stream-text",
  //   // streamProtocol: "text",
  // })
  console.log("completion", completion)
  console.log("input", input)
  console.log("isLoading", isLoading)
  console.log("error", error)

  return (
    <div className="flex max-w-7xl  mx-auto p-4 flex-col items-between justify-center w-full h-screen">
      <div className="flex flex-1 flex-col gap-2 w-full">
        {error && <p className="text-red-500">{error.message}</p>}
        {isLoading && <p className="text-gray-500">Loading...</p>}
        {completion && <ReactMarkdown>{completion}</ReactMarkdown>}
      </div>
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
          setInput("")
        }}
      >
        <input
          className="w-full p-2 rounded-md border border-gray-300"
          type="text"
          name="prompt"
          placeholder="How can I help you today?"
          value={input}
          onChange={handleInputChange}
        />
        {isLoading ? (
          <button type="button" onClick={stop}>
            Stop
          </button>
        ) : (
          <button type="submit" disabled={isLoading}>
            Send
          </button>
        )}
      </form>
    </div>
  )
}
