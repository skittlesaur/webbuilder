import { Request, Response } from 'express'

const getTeamProjectController = async (req: Request, res: Response) => {
  try {
    const { teamUrl, projectUrl } = req.params
    const { prisma, user } = req.context

    const team = await prisma.team.findFirst({
      where: {
        url: teamUrl
      },
      select: {
        id: true,
        name: true,
        url: true,
      }
    })

    if (!team) {
      return res.status(404).json({
        message: 'Team not found'
      })
    }

    const project = await prisma.project.findFirst({
      where: {
        url: projectUrl,
        teamId: team.id
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
          select: {
            id: true,
            path: true,
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
      }
    })

    if (!project) {
      return res.status(404).json({
        message: 'Project not found'
      })
    }

    return res.json(project)
  } catch (error) {
    console.error('Error getting team project', error)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export default getTeamProjectController