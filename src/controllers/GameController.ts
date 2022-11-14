import { FastifyReply, FastifyRequest } from 'fastify'
import { GamesListUseCase } from '../use-cases/games/GamesListUseCase'

import { getGameParams } from '../validations/gameValidation'

export class GameController {
  public async index (request: FastifyRequest, response: FastifyReply) {
    const { id } = getGameParams.parse(request.params)
    const userId = request.user.sub
    const gamesListUseCase = new GamesListUseCase()
    const games = await gamesListUseCase.execute({ poolId: id, userId })
    return response.status(201).send({ games })
  }
}
