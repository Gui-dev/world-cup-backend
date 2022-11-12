import { FastifyInstance } from 'fastify'

import { UserController } from './../controllers/UserController'

const userController = new UserController()

export const userRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/users/count', userController.index)
}
