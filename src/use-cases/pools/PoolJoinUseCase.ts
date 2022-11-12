import { prisma } from '../../services/prisma'
import { AppError } from '../../shared/AppError'

interface IPoolJoinUseCase {
  id: string
  code: string
}
export class PoolJoinUseCase {
  public async execute ({ id, code }: IPoolJoinUseCase): Promise<void> {
    const pool = await prisma.pool.findUnique({
      where: {
        code
      },
      include: {
        participants: {
          where: {
            userId: id
          }
        }
      }
    })

    if (!pool) {
      throw new AppError('Pool not found')
    }

    if (pool.participants.length > 0) {
      throw new AppError('You already joined this pool')
    }

    if (!pool.ownerId) {
      await prisma.pool.update({
        where: {
          id: pool.id
        },
        data: {
          ownerId: id
        }
      })
    }

    await prisma.participant.create({
      data: {
        poolId: pool.id,
        userId: id
      }
    })
  }
}
