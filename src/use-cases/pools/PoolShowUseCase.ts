import { Pool } from '@prisma/client'
import { prisma } from '../../services/prisma'

interface IPoolShowUseCase {
  id: string
}

export class PoolShowUseCase {
  public async execute ({ id }: IPoolShowUseCase): Promise<Pool[]> {
    const pools = await prisma.pool.findMany({
      where: {
        participants: {
          some: {
            userId: id
          }
        }
      },
      include: {
        _count: {
          select: {
            participants: true
          }
        },
        participants: {
          select: {
            id: true,
            user: {
              select: {
                avatarUrl: true
              }
            }
          },
          take: 4
        },
        owner: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return pools
  }
}
