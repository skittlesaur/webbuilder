import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const aiSecret = process.env.AI_JWT_SECRET

if (!aiSecret) {
  throw new Error('AI_JWT_SECRET is not defined')
}

const verifyAiCallController = async (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization
    if (!auth) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = auth.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const decoded = jwt.verify(token, aiSecret)

    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    return res.status(200).json({ message: 'Authorized' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export default verifyAiCallController
