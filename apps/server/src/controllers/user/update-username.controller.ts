import { Request, Response } from 'express'

const updateUserUsernameController = async (req: Request, res: Response) => {
  try {
    const { username } = req.body
    const { prisma, user } = req.context

    const usernameWithoutAt = username.replace('@', '')

    const atLestThreeCharacters = usernameWithoutAt.length >= 3
    if (!atLestThreeCharacters)
      return res.status(400).json({
        message: 'Username must be at least 3 characters long'
      })

    const maxFifteenCharacters = usernameWithoutAt.length <= 15
    if (!maxFifteenCharacters)
      return res.status(400).json({
        message: 'Username must be at most 15 characters long'
      })

    const startsWithNumber = /^\d/.test(usernameWithoutAt)
    if (startsWithNumber)
      return res.status(400).json({
        message: 'Username must not start with a number'
      })

    const startsWithDash = /^-/.test(usernameWithoutAt)
    if (startsWithDash)
      return res.status(400).json({
        message: 'Username must not start with a dash'
      })

    const endsWithDash = /-$/.test(usernameWithoutAt)
    if (endsWithDash)
      return res.status(400).json({
        message: 'Username must not end with a dash'
      })

    const hasSpecialCharacters = /[^a-zA-Z0-9-]/.test(usernameWithoutAt)
    if (hasSpecialCharacters)
      return res.status(400).json({
        message: 'Username must not contain special characters'
      })

    const usernameExists = await prisma.user.findFirst({
      where: {
        username: usernameWithoutAt,
        id: {
          not: user?.id
        }
      }
    })

    if (usernameExists)
      return res.status(400).json({
        message: 'Username already exists'
      })

    const updatedUser = await prisma.user.update({
      where: {
        id: user?.id
      },
      data: {
        username: usernameWithoutAt
      }
    })

    return res.json({
      ...user,
      username: updatedUser.username
    })
  } catch (error) {
    console.error('Error updating user username', error)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export default updateUserUsernameController