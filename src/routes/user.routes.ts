import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { prisma } from '../services/prisma'

export const userRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/users/count', async (request: FastifyRequest, response: FastifyReply) => {
    const count = await prisma.user.count()
    response.status(201).send({ count })
  })
}
