import { Router } from 'express'
import getUserController from '../controllers/user/get-user.controller'
import authMiddleware from '../middlewares/auth.middleware'
import updateUserUsernameController from '../controllers/user/update-username.controller'
import getUserTeamsController from '../controllers/user/get-user-teams.controller'

const userRoutes = Router()
userRoutes.use(authMiddleware)

userRoutes.get('/', getUserController)

userRoutes.post('/username', updateUserUsernameController)

userRoutes.get('/teams', getUserTeamsController)

export default userRoutes