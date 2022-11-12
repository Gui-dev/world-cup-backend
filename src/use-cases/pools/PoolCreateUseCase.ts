import { prisma } from '../../services/prisma'

interface IPoolCreateUseCase {
  user_id: string
  title: string
  code: string
  isUserLogged: boolean
}

export class PoolCreateUseCase {
  public async execute ({ user_id, title, code, isUserLogged }: IPoolCreateUseCase) {
    if (isUserLogged) {
      await prisma.pool.create({
        data: {
          ownerId: user_id,
          title,
          code,
          participants: {
            create: {
              userId: user_id
            }
          }
        }
      })
    } else {
      await prisma.pool.create({
        data: {
          title,
          code
        }
      })
    }

    return code
  }
}
