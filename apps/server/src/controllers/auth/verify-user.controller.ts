import { Request, Response } from 'express'
import { totp } from 'otplib'

const verifyUserController = async (req: Request, res: Response) => {
  try {
    const { prisma, user } = req.context
    const { token } = req.body

    const now = new Date()

    const verificationToken = await prisma.userVerification.findFirst({
      where: {
        token,
        expiresAt: {
          gt: now,
        },
        userId: user?.id,
      },
    })

    if (!verificationToken)
      return res.status(400).json({
        message: 'Invalid verification token'
      })

    const isTokenValid = totp.verify({
      token,
      secret: process.env.OTP_SECRET as string
    })

    if (!isTokenValid)
      return res.status(400).json({
        message: 'Invalid verification token'
      })

    await prisma.userVerification.delete({
      where: {
        id: verificationToken.id
      }
    })

    await prisma.user.update({
      where: {
        id: user?.id
      },
      data: {
        isVerified: true,
      }
    })

    return res.status(200).json({
      message: 'User successfully verified'
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Something went wrong'
    })
  }
}

export default verifyUserController