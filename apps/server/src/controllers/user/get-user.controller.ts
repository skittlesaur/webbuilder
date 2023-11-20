import { Request, Response } from 'express'

const getUserController = async (req: Request, res: Response) => {
  const { user } = req.context
  return res.status(200).json(user)
}

export default getUserController