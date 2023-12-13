import { Router } from 'express'
import generateElementController from '../controllers/ai/generate-element.controller'
import verifyAiCallController from '../controllers/ai/verify-ai-call.controller'
import authMiddleware from '../middlewares/auth.middleware'

const aiRoutes = Router()

aiRoutes.post('/verify', verifyAiCallController)

aiRoutes.use(authMiddleware)
aiRoutes.post('/:pageId/generate-element', generateElementController)

export default aiRoutes
