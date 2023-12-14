import { Router } from 'express'
import migrationMiddleware from '../middlewares/migration.middleware'
import migrateStyleStates from '../controllers/migrate/migrate-style-states.controller'

const migrateRoutes = Router()

migrateRoutes.use(migrationMiddleware)

migrateRoutes.get('/style-states', migrateStyleStates)

export default migrateRoutes