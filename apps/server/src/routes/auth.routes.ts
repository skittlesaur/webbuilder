import { Router } from 'express'
import authSignupController from '../controllers/auth/signup.controller'
import authMiddleware from '../middlewares/auth.middleware'
import verifyUserController from '../controllers/auth/verify-user.controller'
import resendVerificationCodeController from '../controllers/auth/resend-verification-code.controller'
import authLoginController from '../controllers/auth/login.controller'
import authLogoutController from '../controllers/auth/logout.controller'

const authRoutes = Router()

authRoutes.post('/signup', authSignupController)
authRoutes.post('/login', authLoginController)
authRoutes.post('/logout', authLogoutController)

authRoutes.use(authMiddleware)
authRoutes.post('/verify', verifyUserController)
authRoutes.post('/verify/resend', resendVerificationCodeController)

export default authRoutes