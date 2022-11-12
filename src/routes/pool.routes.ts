import { FastifyInstance } from 'fastify'
import { authenticate } from '../plugins/authenticate'

import { PoolController } from './../controllers/PoolController'
import { PoolShowController } from './../controllers/PoolShowController'

const poolController = new PoolController()
const poolShowController = new PoolShowController()

export const poolRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/pools/count', poolController.index)
  fastify.post('/pools', poolController.store)
  fastify.post('/pools/join', { onRequest: [authenticate] }, poolController.create)
  fastify.get('/pools', { onRequest: [authenticate] }, poolShowController.index)
  fastify.get('/pools/:id', { onRequest: [authenticate] }, poolShowController.show)
}
