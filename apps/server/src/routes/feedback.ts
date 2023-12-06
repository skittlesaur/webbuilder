import { Router } from 'express'
import authMiddleware from '../middlewares/auth.middleware'
import addFeedback from '../controllers/feedback/add-feedback'
import getFeedback from '../controllers/feedback/get-feedback'

const feedbackRoutes = Router()
feedbackRoutes.use(authMiddleware)

feedbackRoutes.get('/:feedbackId', getFeedback)
feedbackRoutes.post('/', addFeedback)

export default feedbackRoutes
