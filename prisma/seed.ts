import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
  const user = await prisma.user.create({
    data: {
      name: 'Bruce Wayne',
      email: 'bruce@email.com',
      avatarUrl: 'https://github.com/Gui-dev.png'
    }
  })

  const pool = await prisma.pool.create({
    data: {
      title: 'Example Pool',
      ownerId: user.id,
      code: 'BOL123',
      participants: {
        create: {
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-20T12:00:00.201Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR'
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-24T12:00:00.201Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',
      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,
          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  })
}

main()
