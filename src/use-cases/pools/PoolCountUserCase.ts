import { prisma } from '../../services/prisma'

export class PoolCountUserCase {
  public async execute (): Promise<number> {
    const count = await prisma.pool.count()
    return count
  }
}
