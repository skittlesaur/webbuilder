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
    const { user } = req.context

    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' })
    }

    const auth = jwt.sign(
      {
        userId: user?.id,
      },
      aiSecret
    )

    return res.redirect(307, `${GENERATE_ELEMENT_FUNCTION_URL}?auth=${auth}`)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export default generateElementController
