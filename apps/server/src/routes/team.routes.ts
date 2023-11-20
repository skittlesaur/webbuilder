import { Router } from 'express'
import createTeamController from '../controllers/team/create-team.controller'
import getTeamProjectsController from '../controllers/team/get-team-projects.controller'
import {  } from '@prisma/client'
import getTeamController from '../controllers/team/get-team.controller'
import createTeamProjectController from '../controllers/team/create-project.controller'
import getTeamProjectPageController from '../controllers/team/get-project-page.controller'
import getTeamProjectController from '../controllers/team/get-project.controller'
import updateTeamProjectPageController from '../controllers/team/update-project-page.controller'

const teamRoutes = Router()
// teamRoutes.use(authMiddleware)

teamRoutes.post('/', createTeamController)

teamRoutes.get('/:teamUrl',
  // authorizeTeamRole([TeamRole.OWNER, TeamRole.EDITOR, TeamRole.MEMBER]),
  getTeamController
)

teamRoutes.post('/:teamUrl/project',
  // authorizeTeamRole([TeamRole.OWNER, TeamRole.EDITOR]),
  createTeamProjectController
)

teamRoutes.get('/:teamUrl/project/:projectUrl',
  // authorizeTeamRole([TeamRole.OWNER, TeamRole.EDITOR, TeamRole.MEMBER]),
  getTeamProjectController
)

teamRoutes.get('/:teamUrl/project/:projectUrl/page/:pageId',
  // authorizeTeamRole([TeamRole.OWNER, TeamRole.EDITOR, TeamRole.MEMBER]),
  getTeamProjectPageController
)

teamRoutes.put('/:teamUrl/project/:projectUrl/page/:pageId',
  // authorizeTeamRole([TeamRole.OWNER, TeamRole.EDITOR]),
  updateTeamProjectPageController
)

teamRoutes.get('/:teamUrl/projects',
  // authorizeTeamRole([TeamRole.OWNER, TeamRole.EDITOR, TeamRole.MEMBER]),
  getTeamProjectsController
)

export default teamRoutes