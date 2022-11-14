import { FastifyInstance } from 'fastify'

import { GameController } from './../controllers/GameController'
import { authenticate } from '../plugins/authenticate'

const gameController = new GameController()

export const gameRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/pools/:id/games', { onRequest: [authenticate] }, gameController.index)
}
