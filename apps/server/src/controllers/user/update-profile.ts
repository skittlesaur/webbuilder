import { Request, Response } from 'express'
import isValidUsername from '../../lib/is-valid-username'

type ProfileUpdates = {
  name?: string
  username?: string
  avatar?: string
}

const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { avatar, name, username } = req.body
    const { prisma, user } = req.context

    const updates: ProfileUpdates = {}

    if (avatar !== undefined) {
      updates['avatar'] = avatar
    }

    if (name !== undefined) {
      updates['name'] = name
    }

    if (username !== undefined) {
      const formattedUsername = username.trim().replace(/\s/g, '')
      if (!isValidUsername(formattedUsername))
        return res.status(400).json({
          message: 'Invalid username'
        })

      const existingUser = await prisma.user.findUnique({
        where: {
          username: formattedUsername
        }
      })

      if (existingUser) {
        return res.status(400).json({
          message: 'Username already exists'
        })
      }

      updates['username'] = formattedUsername
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: 'No updates provided'
      })
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user?.id
      },
      data: updates
    })

    return res.status(200).json(updatedUser)
  } catch (error) {
    console.error('Error updating user avatar', error)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export default updateUserProfile