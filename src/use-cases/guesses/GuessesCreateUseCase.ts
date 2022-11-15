import { prisma } from '../../services/prisma'
import { AppError } from '../../shared/AppError'

interface IGuessesCreateUseCase {
  userId: string
  poolId: string
  gameId: string
  firstTeamPoints: number
  secondTeamPoints: number
}

export class GuessesCreateUseCase {
  public async execute ({ userId, poolId, gameId, firstTeamPoints, secondTeamPoints }: IGuessesCreateUseCase): Promise<void> {
    const participant = await prisma.participant.findUnique({
      where: {
        userId_poolId: {
          userId,
          poolId
        }
      }
    })
    if (!participant) {
      throw new AppError("You're not allowed to create a guess inside this pool")
    }
    const guess = await prisma.guess.findUnique({
      where: {
        participantId_gameId: {
          participantId: participant.id,
          gameId
        }
      }
    })
    if (guess) {
      throw new AppError('You already sent a guess to this game on this pool')
    }
    const game = await prisma.game.findUnique({
      where: {
        id: gameId
      }
    })
    if (!game) {
      throw new AppError('Game not found')
    }
    if (game.date < new Date()) {
      throw new AppError('You cannot send after the game')
    }

    await prisma.guess.create({
      data: {
        gameId,
        participantId: participant.id,
        firstTeamPoints,
        secondTeamPoints
      }
    })
  }
}
