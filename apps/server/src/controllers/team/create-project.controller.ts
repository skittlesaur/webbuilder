import { Request, Response } from 'express'
import defaultBreakpoints from '../../lib/default-breakpoints'

const createTeamProjectController = async (req: Request, res: Response) => {
  try {
    const { teamUrl } = req.params
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

    const { name, url } = req.body

    const existingProject = await prisma.project.findFirst({
      where: {
        url,
      }
    })

    if (existingProject) {
      return res.status(400).json({
        message: 'Project already exists'
      })
    }

    const project = await prisma.project.create({
      data: {
        name,
        url,
        team: {
          connect: {
            id: team.id
          }
        },
        createdBy: {
          connect: {
            id: user?.id
          }
        },
        pages: {
          create: {
            path: '/',
            breakpoints: defaultBreakpoints,
            elements: [],
            bodyStyles: [],
            components: [],
            customFonts: [],
            assets: [],
            userPageSettings: {
              create: {
                user: {
                  connect: {
                    id: user?.id
                  }
                },
              }
            }
          }
        }
      }
    })

    const defaultPageId = await prisma.page.findFirst({
      where: {
        projectId: project.id,
        path: '/'
      },
      select: {
        id: true
      }
    })

    res.status(200).json({
      ...project,
      defaultPageId: defaultPageId?.id
    })
  } catch (error) {
    console.error('Error creating team project', error)
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export default createTeamProjectController