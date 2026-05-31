import { z } from "zod"

export const promptValidator = z.object({
  prompt: z.string().min(1),
})
