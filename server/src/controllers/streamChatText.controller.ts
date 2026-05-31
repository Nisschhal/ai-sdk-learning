import { openai } from "@ai-sdk/openai"
import { streamText, UIMessage, convertToModelMessages } from "ai"
import { Request, Response } from "express"

export const streamChatTextController = async (req: Request, res: Response) => {
  try {
    const { messages }: { messages: UIMessage[] } = req.body

    const result = streamText({
      model: openai("gpt-5.4-nano"),
      messages: await convertToModelMessages(messages),
    })

    return result.pipeUIMessageStreamToResponse(res) // for client side to stream only chat messages based response for this to work streamProtocol: "text" must be set in the client side
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
}
