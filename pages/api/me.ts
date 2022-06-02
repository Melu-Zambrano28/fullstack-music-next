import { User } from '@prisma/client'
import { validateRoute } from '../../lib/auth'
import prisma from '../../lib/prisma'

export type Me = User & { playlistsCount: number }

export default validateRoute(async (req, res, user) => {
  const playlistsCount = await prisma.playlist.count({
    where: {
      userId: user.id,
    },
  })

  console.log(playlistsCount)
  res.json({ ...user, playlistsCount })
})
