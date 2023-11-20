import { NextFunction, Request, Response } from 'express'
import { TeamRole } from '@prisma/client'

const authorizeTeamRole = (roles: TeamRole[] | TeamRole) => {
  const rolesArray = Array.isArray(roles) ? roles : [roles]
  return async (req: Request, res: Response, next: NextFunction) => {
    const { teamId, teamUrl } = req.params
    const { user, prisma } = req.context

    const team = await prisma.team.findFirst({
      where: {
        OR: [
          {
            id: teamId,
          },
          {
            url: teamUrl
          }
        ]
      }
    })

    const userTeamRole = await prisma.teamMember.findFirst({
      where: {
        teamId: team?.id,
        userId: user?.id,
        role: {
          in: rolesArray
        }
      }
    })

    if (!userTeamRole) {
      return res.status(403).json({
        error: 'Unauthorized'
      })
    }

    next()
  }
}

export default authorizeTeamRole