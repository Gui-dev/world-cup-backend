import Fastify from 'fastify'
import cors from '@fastify/cors'

import { prisma } from './services/prisma'

const bootstrap = async () => {
  const PORT = 3333 || process.env.PORT
  const fastify = Fastify({
    logger: true
  })

  await fastify.register(cors, {
    origin: true
  })

  fastify.get('/pools/count', async (req, res) => {
    const count = await prisma.pool.count()

    return { count }
  })

  await fastify.listen({
    port: PORT,
    host: '0.0.0.0'
  })
}

bootstrap()
