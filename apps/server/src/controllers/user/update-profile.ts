import { Request, Response } from 'express'

const updateUserAvatar = async (req: Request, res: Response) => {
  try {
    const { avatar } = req.body
    const { prisma, user } = req.context

    const updatedUser = await prisma.user.update({
      where: {
        id: user?.id
      },
      data: {
        avatar
      }
    })

    return res.status(200).json(updatedUser)
  } catch (error) {
    console.error('Error updating user avatar', error)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export default updateUserAvatar