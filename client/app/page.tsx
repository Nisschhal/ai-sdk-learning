"use client"
import { useState } from "react"

export default function Home() {
  const [prompt, setPrompt] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      console.log(prompt)
      const response = await fetch("http://localhost:8000/api/generate-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })
      console.log(response)

      if (!response.ok) {
        throw new Error("Failed to generate text")
      }
      const data = await response.json()
      setAiResponse(data.text)
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred",
      )
    } finally {
      setIsLoading(false)
      setPrompt("")
    }
  }
  return (
    <div className="flex max-w-7xl  mx-auto p-4 flex-col items-between justify-center w-full h-screen">
      <div className="flex flex-1 flex-col gap-2 w-full">
        {error && <p className="text-red-500">{error}</p>}
        {isLoading && <p className="text-gray-500">Loading...</p>}
        {aiResponse && <p className="text-gray-500">{aiResponse}</p>}
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
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
