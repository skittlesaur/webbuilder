import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const GENERATE_ELEMENT_FUNCTION_URL = process.env.GENERATE_ELEMENT_FUNCTION_URL

if (!GENERATE_ELEMENT_FUNCTION_URL) {
  throw new Error('GENERATE_ELEMENT_FUNCTION_URL is not defined')
}

const aiSecret = process.env.AI_JWT_SECRET

if (!aiSecret) {
  throw new Error('AI_JWT_SECRET is not defined')
}

const generateElementController = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body
    const { pageId } = req.params
    const { user, prisma } = req.context

    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' })
    }

    const remainingTokens = user?.remainingTokens ?? 0

    if (remainingTokens <= 0) {
      return res.status(403).json({ message: 'You have no remaining tokens' })
    }

    const page = await prisma.page.findUnique({
      where: {
        id: pageId,
      },
      select: {
        variables: true,
      },
    })

    if (!page) {
      return res.status(404).json({ message: 'Page not found' })
    }

    await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        remainingTokens: remainingTokens - 1,
      },
    })

    const auth = jwt.sign(
      {
        userId: user?.id,
      },
      aiSecret,
      {
        expiresIn: '5m',
      }
    )

    const searchParams = new URLSearchParams({
      auth,
      variables: JSON.stringify(page.variables),
    })

    return res.redirect(
      307,
      `${GENERATE_ELEMENT_FUNCTION_URL}?${searchParams.toString()}`
    )
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export default generateElementController
