import { PrismaClient } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'

const prismaMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const prisma = new PrismaClient()
    req.context = {
      prisma,
    }
    return next()
  } catch (error) {
    console.error('Error connecting to database', error)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export default prismaMiddleware