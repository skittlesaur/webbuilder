import { Request, Response } from 'express'

const updateTeamProjectPageController = async (req: Request, res: Response) => {
  try {
    const { teamUrl, projectUrl, pageId } = req.params
    const { elements, bodyStyles, customFonts, assets, components, breakpoints, pan, zoom, screenshotUrl } = req.body
    const { prisma, user } = req.context

    const team = await prisma.team.findUnique({
      where: {
        url: teamUrl
      }
    })

    if (!team) {
      return res.status(404).json({ message: 'Team not found' })
    }

    const project = await prisma.project.findUnique({
      where: {
        url: projectUrl
      }
    })

    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }

    const page = await prisma.page.findFirst({
      where: {
        id: pageId,
        projectId: project.id
      }
    })

    if (!page) {
      return res.status(404).json({ message: 'Page not found' })
    }

    const updatedPage = await prisma.page.update({
      where: {
        id: pageId
      },
      data: {
        elements,
        bodyStyles,
        customFonts,
        assets,
        components,
        breakpoints,
        ...(screenshotUrl ? { screenshot: screenshotUrl } : undefined)
      }
    })

    const userPageSettings = await prisma.userPageSettings.findFirst({
      where: {
        userId: user?.id,
        pageId: updatedPage.id
      }
    })

    if (userPageSettings) {
      await prisma.userPageSettings.update({
        where: {
          id: userPageSettings.id
        },
        data: {
          panX: pan.x,
          panY: pan.y,
          zoom
        }
      })
    } else {
      await prisma.userPageSettings.create({
        data: {
          panX: pan.x,
          panY: pan.y,
          zoom,
          user: {
            connect: {
              id: user?.id
            }
          },
          page: {
            connect: {
              id: updatedPage.id
            }
          }
        }
      })
    }

    return res.json({
      ...updatedPage,
      pan,
      zoom
    })
  } catch (error) {

  }
}

export default updateTeamProjectPageController