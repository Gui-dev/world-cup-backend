import Fastify from 'fastify'

const bootstrap = async () => {
  const PORT = 3333 || process.env.PORT
  const fastify = Fastify({
    logger: true
  })

  fastify.get('/pools/count', () => {
    return { count: 32718743321321 }
  })

  await fastify.listen({
    port: PORT
  })
}

bootstrap()
