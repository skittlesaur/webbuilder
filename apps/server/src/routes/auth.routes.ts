import { Router } from 'express'
import authSignupController from '../controllers/auth/signup.controller'
import authMiddleware from '../middlewares/auth.middleware'
import verifyUserController from '../controllers/auth/verify-user.controller'
import resendVerificationCodeController from '../controllers/auth/resend-verification-code.controller'

const authRoutes = Router()

authRoutes.post('/signup', authSignupController)

authRoutes.use(authMiddleware)
authRoutes.post('/verify', verifyUserController)
authRoutes.post('/verify/resend', resendVerificationCodeController)

export default authRoutes