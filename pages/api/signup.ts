/* eslint-disable no-console */
/* eslint-disable no-debugger */
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body

  let user
  try {
    const salt = bcrypt.genSaltSync()
    const hashedPassword = bcrypt.hashSync(password, salt)
    user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })
  } catch (e) {
    res.status(401)
    console.log('pippocazzo eee ', e)
    res.json({ error: 'User already exists' })
    return
  }

  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
      time: Date.now(),
    },
    'hello',
    { expiresIn: '8h' }
  )

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('TRAX_ACCESS_TOKEN', token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  )

  res.json(user)
}
