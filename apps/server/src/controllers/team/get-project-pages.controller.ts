import { Request, Response } from 'express'

const getProjectPagesController = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params
    const { prisma, user } = req.context

    const pages = await prisma.page.findMany({
      where: {
        projectId
      },
      select: {
        id: true,
        path: true,
      }
    })

    // group pages with depth based on url segments
    // e.g. {path: /about, depth: 0}, {path: /about/team, depth: 1}, {path: /about/team/1, depth: 2}

    const groupedPages = pages.reduce((acc, page) => {
      const segments = page.path.split('/')
      const depth = segments.length - 1
      acc.push({ ...page, depth })
      return acc
    }, [] as any)

    return res.status(200).json(groupedPages)
  } catch (error) {
    console.error('Error getting project pages', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default getProjectPagesController