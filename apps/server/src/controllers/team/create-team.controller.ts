import { TeamRole } from '@prisma/client'
import { Request, Response } from 'express'

const createTeamController = async (req: Request, res: Response) => {
  try {
    const { prisma, user } = req.context
    const { name, url } = req.body

    const teamExists = await prisma.team.findFirst({
      where: {
        url
      }
    })

    if (teamExists)
      return res.status(400).json({
        message: 'Team already exists'
      })

    const team = await prisma.team.create({
      data: {
        name,
        url,
      }
    })

    await prisma.teamMember.create({
      data: {
        role: TeamRole.OWNER,
        teamId: team.id,
        userId: user?.id as string,
      }
    })

    return res.status(200).json(team)
  } catch (error) {
    console.error('Error creating team', error)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export default createTeamController