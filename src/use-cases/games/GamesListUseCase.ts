import { Game } from '@prisma/client'
import { prisma } from '../../services/prisma'

interface IGamesListUseCase {
  poolId: string
  userId: string
}

export class GamesListUseCase {
  public async execute ({ poolId, userId }: IGamesListUseCase): Promise<Game[]> {
    const gamesResult = await prisma.game.findMany({
      orderBy: {
        date: 'desc'
      },
      include: {
        guesses: {
          where: {
            participant: {
              userId,
              poolId
            }
          }
        }
      }
    })

    const games = gamesResult.map(game => {
      return {
        ...game,
        guess: game.guesses.length > 0 ? game.guesses[0] : null,
        guesses: undefined
      }
    })

    return games
  }
}
