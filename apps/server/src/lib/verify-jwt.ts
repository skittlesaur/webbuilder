import { PrismaClient, User } from '@prisma/client'
import jwt from 'jsonwebtoken'

const verifyJwt = async (token: string, prisma: PrismaClient) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string }

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id
      },
    }) as Omit<User, 'password'> & { password?: string }

    if (!user) return null

    // remove password from user object
    delete user.password

    return user
  } catch (error) {
    return null
  }
}

export default verifyJwt