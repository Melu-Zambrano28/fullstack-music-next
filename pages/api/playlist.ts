import prisma from '../../lib/prisma'
import { validateRoute } from '../../lib/auth'

export default validateRoute(async (req, res, user) => {
  try {
    const playlists = await prisma.playlist.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        name: 'asc',
      },
    })
    res.json(playlists)
  } catch (error) {
    console.log('Errore ', error)
  }
})
