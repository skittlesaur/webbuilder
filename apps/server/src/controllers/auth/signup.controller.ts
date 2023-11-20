import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { totp } from 'otplib'
import VerificationEmail from '../../../emails/verification'
import sendEmail from '../../lib/send-email'
import { generateFromEmail } from "unique-username-generator"

totp.options = {
  digits: 6,
  step: 15 * 60, // 15 minutes to expire
}

const authSignupController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const isEmailValid = emailRegex.test(email)
    if (!isEmailValid)
      return res.status(400).json({
        message: 'Invalid email'
      })

    const isPasswordEightCharactersLong = password.length >= 8
    if (!isPasswordEightCharactersLong)
      return res.status(400).json({
        message: 'Password must be at least 8 characters long'
      })

    const isPasswordContainsNumber = /\d/.test(password)
    if (!isPasswordContainsNumber)
      return res.status(400).json({
        message: 'Password must contain at least one number'
      })

    const isPasswordContainsLowerCase = /[a-z]/.test(password)
    if (!isPasswordContainsLowerCase)
      return res.status(400).json({
        message: 'Password must contain at least one lowercase letter'
      })

    const isPasswordContainsUpperCase = /[A-Z]/.test(password)
    if (!isPasswordContainsUpperCase)
      return res.status(400).json({
        message: 'Password must contain at least one uppercase letter'
      })

    const isPasswordContainsSpecialCharacter = /[^a-zA-Z0-9]/.test(password)
    if (!isPasswordContainsSpecialCharacter)
      return res.status(400).json({
        message: 'Password must contain at least one special character'
      })

    const { prisma } = req.context

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      }
    })

    if (userExists)
      return res.status(400).json({
        message: 'Email already exists, please login instead'
      })

    const hashedPassword = await bcrypt.hash(password, 10)

    const username = generateFromEmail(email, 3)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
      select: {
        id: true,
        email: true,
        avatar: true,
        createdAt: true,
      }
    })

    const verificationOtp = totp.generate(process.env.OTP_SECRET as string)

    await Promise.all([
      prisma.userVerification.create({
        data: {
          token: verificationOtp,
          expiresAt: new Date(Date.now() + 1000 * 60 * 15), // 15 minutes to expire
          user: {
            connect: {
              id: user.id,
            },
          }
        }
      })
      ,
      sendEmail({
        to: user.email,
        subject: 'Verify your email',
        react: VerificationEmail({ verificationCode: verificationOtp }),
      })
    ])

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

    return res.status(200).json(user)
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export default authSignupController