import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const authLoginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const { prisma } = req.context

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        createdAt: true,
        password: true,
      }
    })

    if (!user)
      return res.status(400).json({
        message: 'Invalid email or password'
      })

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid)
      return res.status(400).json({
        message: 'Invalid email or password'
      })

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1d'
    })

    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1w'
    })

    res.cookie('access', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      domain: process.env.COOKIE_DOMAIN,
    })

    res.cookie('refresh', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7 * 4,
      domain: process.env.COOKIE_DOMAIN,
    })

    const { password: _, ...rest } = user
    return res.status(200).json(rest)
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export default authLoginController