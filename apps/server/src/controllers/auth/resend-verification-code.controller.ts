import { Request, Response } from 'express'
import { totp } from 'otplib'
import VerificationEmail from '../../../emails/verification'
import sendEmail from '../../lib/send-email'

const resendVerificationCodeController = async (req: Request, res: Response) => {
  try {
    const { prisma, user } = req.context

    await prisma.userVerification.deleteMany({
      where: {
        userId: user?.id as string,
      },
    })

    const token = totp.generate(process.env.OTP_SECRET as string)

    await prisma.userVerification.create({
      data: {
        token,
        userId: user?.id as string,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
    })

    await sendEmail({
      to: user?.email as string,
      subject: 'Verify your email',
      react: VerificationEmail({ verificationCode: token, }),
    })

    return res.status(200).json({
      message: 'Verification code successfully sent',
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Something went wrong',
    })
  }
}

export default resendVerificationCodeController