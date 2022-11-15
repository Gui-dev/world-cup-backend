import { prisma } from '../../services/prisma'

export class GuessesCountUseCase {
  public async execute () {
    const count = await prisma.guess.count()
    return count
  }
}
