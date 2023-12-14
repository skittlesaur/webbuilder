import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import verifyJwt from '../lib/verify-jwt'

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies.access || req.headers.authorization?.split(' ')[1]
    const refreshToken = req.cookies.refresh

    if (!accessToken) return res.status(401).json({
      message: 'No authentication token provided'
    })

    const userFromAccessToken = await verifyJwt(accessToken, req.context.prisma)

    if (userFromAccessToken) {
      req.context.user = userFromAccessToken
      return next()
    }

    if (!refreshToken) return res.status(401).json({
      message: 'No authentication token provided'
    })

    const userFromRefreshToken = await verifyJwt(refreshToken, req.context.prisma)

    if (!userFromRefreshToken) return res.status(401).json({
      message: 'Invalid authentication token'
    })

    const newAccessToken = jwt.sign({ id: userFromRefreshToken.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1d'
    })

    const newRefreshToken = jwt.sign({ id: userFromRefreshToken.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1w'
    })

    res.cookie('access', newAccessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      domain: process.env.COOKIE_DOMAIN,
    })

    res.cookie('refresh', newRefreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7 * 4,
      domain: process.env.COOKIE_DOMAIN,
    })

    req.context.user = userFromRefreshToken

    return next()
  } catch (error) {
    console.error('Error authenticating user', error)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export default authMiddleware