import { FastifyReply, FastifyRequest } from 'fastify'
import { PoolListUseCase } from '../use-cases/pools/PoolListUseCase'

import { PoolShowUseCase } from '../use-cases/pools/PoolShowUseCase'
import { getPoolParams } from '../validations/poolValidation'

export class PoolShowController {
  public async index (request: FastifyRequest, response: FastifyReply) {
    const id = request.user.sub
    const poolShowUseCase = new PoolShowUseCase()
    const pools = await poolShowUseCase.execute({ id })

    return response.status(201).send({ pools })
  }

  public async show (request: FastifyRequest, response: FastifyReply) {
    const { id } = getPoolParams.parse(request.params)
    const poolListUseCase = new PoolListUseCase()
    const pool = await poolListUseCase.execute({ id })

    return response.status(201).send({ pool })
  }
}
