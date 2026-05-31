import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"
import { Request, Response } from "express"
import { promptValidator } from "../validator/prompt.validator"

export const generateTextController = async (req: Request, res: Response) => {
  console.log(req.body)
  const { prompt } = promptValidator.parse(req.body)

  const { text } = await generateText({
    model: openai("gpt-5.4-nano"),
    prompt: prompt,
  })

  res.json({ text })
}
