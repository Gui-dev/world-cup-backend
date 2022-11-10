import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { prisma } from '../services/prisma'

export const guessRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/guesses/count', async (request: FastifyRequest, response: FastifyReply) => {
    const count = await prisma.guess.count()
    response.status(201).send({ count })
  })
}
