import { Router } from 'express'
import getUserController from '../controllers/user/get-user.controller'
import authMiddleware from '../middlewares/auth.middleware'
import updateUserUsernameController from '../controllers/user/update-username.controller'
import getUserTeamsController from '../controllers/user/get-user-teams.controller'
import updateUserProfile from '../controllers/user/update-profile'
import completeOnboardingController from '../controllers/user/complete-onboarding.controller'

const userRoutes = Router()
userRoutes.use(authMiddleware)

userRoutes.get('/', getUserController)
userRoutes.put('/', updateUserProfile)

userRoutes.post('/username', updateUserUsernameController)
userRoutes.post('/complete-onboarding', completeOnboardingController)

userRoutes.get('/teams', getUserTeamsController)

export default userRoutes