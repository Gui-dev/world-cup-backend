import { FastifyReply, FastifyRequest } from 'fastify'

import { GuessesCountUseCase } from '../use-cases/guesses/GuessesCountUseCase'
import { GuessesCreateUseCase } from '../use-cases/guesses/GuessesCreateUseCase'
import { createGuessBody, createGuessParams } from '../validations/guessesValidation'

export class GuessController {
  public async index (request: FastifyRequest, response: FastifyReply) {
    const guessesCountUseCase = new GuessesCountUseCase()
    const count = await guessesCountUseCase.execute()
    response.status(201).send({ count })
  }

  public async create (request: FastifyRequest, response: FastifyReply) {
    const userId = request.user.sub
    const { poolId, gameId } = createGuessParams.parse(request.params)
    const { firstTeamPoints, secondTeamPoints } = createGuessBody.parse(request.body)
    const guessesCreateUseCase = new GuessesCreateUseCase()
    await guessesCreateUseCase.execute({
      userId,
      poolId,
      gameId,
      firstTeamPoints,
      secondTeamPoints
    })

    return response.status(201).send()
  }
}
