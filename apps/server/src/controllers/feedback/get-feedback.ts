import { Request, Response } from 'express'

const getFeedback = async (req: Request, res: Response) => {
  try {
    const { prisma, user } = req.context
    const { feedbackId } = req.params

    const feedback = await prisma.feedback.findFirst({
      where: {
        id: feedbackId,
        userId: user?.id,
      },
    })

    if (!feedback) {
      return res.status(404).json({
        message: 'Feedback not found',
      })
    }

    return res.status(200).json(feedback)
  } catch (error) {
    console.error('Error getting feedback', error)
    return res.status(500).json({
      message: 'Internal server error',
    })
  }
}


export default getFeedback