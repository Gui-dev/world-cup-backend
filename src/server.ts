import Fastify from 'fastify'

const bootstrap = async () => {
  const PORT = 3333 || process.env.PORT
  const fastify = Fastify({
    logger: true
  })

  await fastify.listen({
    port: PORT
  })
}

bootstrap()
