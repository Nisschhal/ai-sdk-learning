import { Router } from "express"
import { generateTextController } from "../controllers/generateText.controller"

const router = Router()

router.post("/generate-text", generateTextController)

export default router
