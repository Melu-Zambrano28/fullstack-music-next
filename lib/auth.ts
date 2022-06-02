import { User } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from './prisma'

type HandleFunction = (
  arg0: NextApiRequest,
  arg1: NextApiResponse<any>,
  arg2: User
) => any

export const validateRoute = (handler: HandleFunction) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.TRAX_ACCESS_TOKEN

    if (token) {
      let user: User | undefined

      try {
        const { id } = jwt.verify(token, 'hello')
        user = await prisma.user.findUnique({
          where: { id },
        })

        if (!user) {
          throw new Error('Not real user')
        }
      } catch (error) {
        res.status(401)
        res.json({ error: 'Not Authorizied' })
        return
      }

      return handler(req, res, user)
    }

    res.status(401)
    res.json({ error: 'Not Authorizied' })
  }
}

export const validateToken = (token) => {
  const user = jwt.verify(token, 'hello')
  return user
}
