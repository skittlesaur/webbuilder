import { Request, Response } from 'express'
import sendEmail from '../../lib/send-email'
import FeedbackEmail from '../../../emails/feedback'

const addFeedback = async (req: Request, res: Response) => {
  try {
    const { prisma, user } = req.context
    const {
      experience,
      easyNavigation,
      design,
      clearInterface,
      exportQuality,
      integrationRating,
      issuesWithExports,
      mostBeneficialFeature,
      missingFeature,
      performanceRating,
      performanceLag,
      learningCurve,
      improvements,
      additionalFeatures,
      recommendationLikelihood,
    } = req.body

    const requiredFields = [
      experience,
      easyNavigation,
      design,
      clearInterface,
      exportQuality,
      integrationRating,
      performanceRating,
      learningCurve,
      recommendationLikelihood,
    ]

    for (const requiredField of requiredFields) {
      if (requiredField === undefined || requiredField === null) {
        return res.status(400).send({
          message: 'Please fill out all required fields',
        })
      }
    }

    const feedback = await prisma.feedback.create({
      data: {
        experience,
        easyNavigation,
        design,
        clearInterface,
        exportQuality,
        integrationRating,
        issuesWithExports,
        mostBeneficialFeature,
        missingFeature,
        performanceRating,
        performanceLag,
        learningCurve,
        improvements,
        additionalFeatures,
        recommendationLikelihood,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    })

    await sendEmail({
      to: user?.email as string,
      subject: 'Thank you for your feedback!',
      react: FeedbackEmail({
        url: `${process.env.CLIENT_URL}/feedback/${feedback.id}`,
      }),
    })

    return res.status(200).json(feedback)
  } catch (error) {
    console.error('Error adding feedback', error)
    return res.status(500).json({
      message: 'Internal server error',
    })
  }
}

export default addFeedback
