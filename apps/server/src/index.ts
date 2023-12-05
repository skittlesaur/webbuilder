import express, { Response } from 'express'
import * as bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import { PrismaClient, User } from '@prisma/client'
import authRoutes from './routes/auth.routes'
import prismaMiddleware from './middlewares/prisma.middleware'
import userRoutes from './routes/user.routes'
import teamRoutes from './routes/team.routes'
import publicRoutes from './routes/public.routes'

declare global {
  namespace Express {
    interface Request {
      context: {
        prisma: PrismaClient
        user?: Partial<User> & Pick<User, 'id'>
      }
    }
  }
}

dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compression())
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}))
app.use(prismaMiddleware)

app.get('/ping', (_, res: Response) => {
  res.send('pong')
})

app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/team', teamRoutes)
app.use('/public', publicRoutes)

const PORT = process.env.PORT ?? 1111

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

export default app