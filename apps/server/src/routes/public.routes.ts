import { Router } from 'express'
import getPublicPage from '../controllers/public/page.controller'

const publicRoutes = Router()

publicRoutes.get('/:domain', getPublicPage)

export default publicRoutes