import { Request, Response } from 'express'

const getPublicPage = async (req: Request, res: Response) => {
  try {
    const { domain } = req.params
    const { page } = req.query
    const { prisma } = req.context

    const project = await prisma.project.findFirst({
      where: {
        url: domain,
      }
    })

    if (!project) {
      return res.status(404).send('Not found')
    }

    const startWithSlash = page?.toString().startsWith('/') ? `${page}` : `/${page}`

    const pageContent = await prisma.page.findFirst({
      where: {
        projectId: project.id,
        path: startWithSlash,
      }
    })

    if (!pageContent) {
      return res.status(404).send('Not found')
    }

    return res.status(200).json(pageContent)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Internal server error')
  }
}


export default getPublicPage