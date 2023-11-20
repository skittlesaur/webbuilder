import { Request, Response } from 'express'

const getUserTeamsController = async (req: Request, res: Response) => {
  try {
    const { prisma, user } = req.context

    const teams = await prisma.team.findMany({
      where: {
        teamMembers: {
          some: {
            userId: user?.id
          }
        }
      }
    })

    return res.status(200).json(teams)
  } catch (error) {
    console.error('Error getting user teams', error)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export default getUserTeamsController