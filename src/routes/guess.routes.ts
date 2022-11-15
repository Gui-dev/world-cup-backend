import { FastifyInstance } from 'fastify'

import { GuessController } from '../controllers/GuessController'
import { authenticate } from '../plugins/authenticate'

const guessController = new GuessController()

export const guessRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/guesses/count', guessController.index)
  fastify.post(
    '/pools/:poolId/games/:gameId/guesses',
    { onRequest: [authenticate] },
    guessController.create
  )
}
