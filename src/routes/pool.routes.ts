import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import ShortUniqueId from 'short-unique-id'

import { prisma } from '../services/prisma'
import { createPoolBody } from '../validations/poolValidation'

export const poolRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/pools/count', async (request: FastifyRequest, response: FastifyReply) => {
    const count = await prisma.pool.count()
    response.status(201).send({ count })
  })

  fastify.post('/pools', async (request: FastifyRequest, response: FastifyReply) => {
    const { title } = createPoolBody.parse(request.body)
    const generate = new ShortUniqueId({ length: 6 })
    const code = String(generate()).toUpperCase()
    await prisma.pool.create({
      data: {
        title,
        code
      }
    })

    return response.status(201).send({ code })
  })
}
