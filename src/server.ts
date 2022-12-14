import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { poolRoutes } from './routes/pool.routes'
import { userRoutes } from './routes/user.routes'
import { gameRoutes } from './routes/game.routes'
import { guessRoutes } from './routes/guess.routes'
import { authRoutes } from './routes/auth.routes'
import { AppError } from './shared/AppError'

const bootstrap = async () => {
  const PORT = 3333 || process.env.PORT
  const fastify = Fastify({
    logger: true
  })

  await fastify.register(cors, {
    origin: true
  })

  await fastify.register(jwt, {
    secret: String(process.env.JWT_SECRET)
  })

  await fastify.register(poolRoutes)
  await fastify.register(userRoutes)
  await fastify.register(gameRoutes)
  await fastify.register(guessRoutes)
  await fastify.register(authRoutes)

  fastify.setErrorHandler(function (error, request, reply) {
    if (error instanceof AppError) {
      reply.status(Number(error.statusCode)).send({ message: error.message })
    }

    reply.status(500).send({ ok: false })
  })

  await fastify.listen({
    port: PORT,
    host: '0.0.0.0'
  })
}

bootstrap()
