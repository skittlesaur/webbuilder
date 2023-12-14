import { Request, Response, NextFunction } from 'express'

const migrationSecret = process.env.MIGRATION_SECRET

if (!migrationSecret) {
  throw new Error('Migration secret not found')
}

const migrationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization
  const token = auth?.split(' ')[1]

  if (token !== migrationSecret) {
    return res.status(401).json({
      message: 'Unauthorized',
    })
  }

  next()
}

export default migrationMiddleware
