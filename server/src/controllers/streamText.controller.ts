import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"
import { Request, Response } from "express"
import { promptValidator } from "../validator/prompt.validator"

export const streamTextController = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const { prompt } = promptValidator.parse(req.body)

    const result = streamText({
      model: openai("gpt-5.4-nano"),
      prompt: prompt,
    })

    return result.pipeTextStreamToResponse(res) // for client side to stream only text based response for this to work streamProtocol: "text" must be set in the client side
    // result.pipeUIMessageStreamToResponse(res) // for client side to stream only text based response for this to work streamProtocol: "text" must be set in the client side
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
}
