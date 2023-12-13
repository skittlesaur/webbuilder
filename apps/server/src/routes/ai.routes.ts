import { Router } from 'express'
import generateElementController from '../controllers/ai/generate-element.controller'
import verifyAiCallController from '../controllers/ai/verify-ai-call.controller'

const aiRoutes = Router()

aiRoutes.post('/generate-element', generateElementController)
aiRoutes.post('/verify', verifyAiCallController)

export default aiRoutes
