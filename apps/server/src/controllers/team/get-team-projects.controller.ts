import { Request, Response } from 'express'

const getTeamProjectsController = async (req: Request, res: Response) => {
  try {
    const { teamUrl } = req.params
    const { prisma } = req.context

    const team = await prisma.team.findFirst({
      where: {
        url: teamUrl
      }
    })

    if (!team)
      return res.status(404).json({
        message: 'Team not found'
      })

    const projects = await prisma.project.findMany({
      where: {
        teamId: team.id
      },
      orderBy: {
        updatedAt: 'desc'
      },
      select: {
        id: true,
        name: true,
        url: true,
        createdAt: true,
        updatedAt: true,
        createdBy: {
          select: {
            name: true,
            username: true,
            avatar: true,
          }
        },
        lastEditedBy: {
          select: {
            name: true,
            username: true,
            avatar: true,
          }
        },
        pages: {
          where: {
            path: '/',
          },
          select: {
            id: true,
          }
        }
      },
    })

    return res.json(projects)
  } catch (error) {
    console.error('Error getting team projects', error)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export default getTeamProjectsController