import { Request, Response } from 'express'

const completeOnboardingController = async (req: Request, res: Response) => {
  try {
    const { prisma, user } = req.context

    if (!user)
      return res.status(401).json({
        message: 'Unauthorized',
      })

    await prisma.user.update({
      where: { id: user.id },
      data: {
        onboarded: true,
      },
    })

    return res.status(200).json({
      message: 'Onboarding completed',
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      message: 'Something went wrong',
    })
  }
}

export default completeOnboardingController
