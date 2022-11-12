import { FastifyReply, FastifyRequest } from 'fastify'
import { UserCountUsecase } from '../use-cases/users/UsersCountUseCase'

export class UserController {
  public async index (request: FastifyRequest, response: FastifyReply) {
    const userCountUsecase = new UserCountUsecase()
    const count = await userCountUsecase.execute()

    return response.status(201).send({ count })
  }
}
