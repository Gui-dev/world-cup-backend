import { Pool } from '@prisma/client'

import { prisma } from '../../services/prisma'
import { AppError } from '../../shared/AppError'

interface IPoolListUseCase {
  id: string
}

export class PoolListUseCase {
  public async execute ({ id }: IPoolListUseCase): Promise<Pool> {
    const pool = await prisma.pool.findUnique({
      where: {
        id
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

    if (!pool) {
      throw new AppError('Pool not found')
    }

    return pool
  }
}
