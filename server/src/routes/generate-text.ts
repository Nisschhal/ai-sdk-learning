import { Router } from "express"
import { streamTextController } from "../controllers/streamText.controller"
import { generateTextController } from "../controllers/generateText.controller copy"
import { streamChatTextController } from "../controllers/streamChatText.controller"

const router = Router()

router.post("/generate-text", generateTextController)
router.post("/stream-text", streamTextController)
router.post("/stream-chat-text", streamChatTextController)

export default router
