import { Request, Response } from 'express'

const createProjectPageController = async (req: Request, res: Response) => {
  try {
    const { projectUrl } = req.params
    const { prisma, user } = req.context

    const project = await prisma.project.findUnique({
      where: {
        url: projectUrl
      },
      select: {
        id: true
      }
    })

    if (!project) return res.status(404).json({ message: 'Project not found' })


    const { path } = req.body

    const pathStartsWithSlash = path.startsWith('/') ? path : `/${path}`
    const removeEndingSlash = pathStartsWithSlash.endsWith('/') ? pathStartsWithSlash.slice(0, -1) : pathStartsWithSlash
    const formattedPath = removeEndingSlash.toLowerCase().trim().replace(/\s/g, '-')

    const pageExists = await prisma.page.findFirst({
      where: {
        projectId: project.id,
        path: formattedPath
      }
    })

    if (pageExists) return res.status(400).json({ message: 'Page already exists' })

    const page = await prisma.page.create({
      data: {
        path: formattedPath,
        Project: {
          connect: {
            id: project.id
          }
        },
        elements: [],
        customFonts: [],
        components: [],
        breakpoints: [],
        bodyStyles: {},
        assets: [],
        userPageSettings: {
          create: {
            userId: user?.id,
          }
        }
      },
      select: {
        id: true,
        path: true,
      }
    })

    return res.status(200).json(page)
  } catch (error) {
    console.error('Error creating project page', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default createProjectPageController