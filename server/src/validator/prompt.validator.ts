import { z } from "zod"

export const promptValidator = z.object({
  prompt: z.string().min(1),
})

export const chatPromptValidator = z.object({
  messages: z.unknown(),
})
