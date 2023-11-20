import { Request, Response } from 'express'

const getTeamController = async (req: Request, res: Response) => {
  try {
    const { teamUrl } = req.params
    const { prisma } = req.context

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

    res.status(200).json(team)
  } catch (error) {
    console.error('Error getting team', error)
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export default getTeamController