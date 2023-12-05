import { Request, Response } from 'express'

const authLogoutController = async (req: Request, res: Response) => {
  try {
    res.clearCookie('access', {
      domain: process.env.COOKIE_DOMAIN,
    })

    res.clearCookie('refresh', {
      domain: process.env.COOKIE_DOMAIN,
    })

    return res.status(200).json({
      message: 'Logout success'
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export default authLogoutController