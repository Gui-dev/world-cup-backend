import { prisma } from '../../services/prisma'

export class UserCountUsecase {
  public async execute (): Promise<number> {
    const count = await prisma.user.count()
    return count
  }
}
