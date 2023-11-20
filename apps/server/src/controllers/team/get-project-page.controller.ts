import { Request, Response } from 'express'

const getTeamProjectPageController = async (req: Request, res: Response) => {
  try {
    const { teamUrl, projectUrl, pageId } = req.params
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
      }
    })

    if (!project) {
      return res.status(404).json({
        message: 'Project not found'
      })
    }

    const page = await prisma.page.findFirst({
      where: {
        id: pageId,
        projectId: project.id
      },
      select: {
        id: true,
        path: true,
        elements: true,
        customFonts: true,
        components: true,
        breakpoints: true,
        bodyStyles: true,
        assets: true,
      }
    })

    if (!page) {
      return res.status(404).json({
        message: 'Page not found'
      })
    }

    const userPageSettings = await prisma.userPageSettings.findFirst({
      where: {
        userId: user?.id,
        pageId: page.id
      },
      select: {
        panX: true,
        panY: true,
        zoom: true,
      }
    })

    return res.status(200).json({
      ...page,
      ...userPageSettings
    })
  } catch (error) {
    console.error('Error getting team project page', error)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export default getTeamProjectPageController