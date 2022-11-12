import { FastifyReply, FastifyRequest } from 'fastify'
import ShortUniqueId from 'short-unique-id'

import { PoolCountUserCase } from '../use-cases/pools/PoolCountUserCase'
import { PoolCreateUseCase } from '../use-cases/pools/PoolCreateUseCase'
import { PoolJoinUseCase } from '../use-cases/pools/PoolJoinUseCase'
import { createPoolBody, poolJoinBody } from '../validations/poolValidation'

export class PoolController {
  public async index (request: FastifyRequest, response: FastifyReply) {
    const poolCountUserCase = new PoolCountUserCase()
    const count = await poolCountUserCase.execute()

    return response.status(201).send({ count })
  }

  public async store (request: FastifyRequest, response: FastifyReply) {
    const { title } = createPoolBody.parse(request.body)
    const user_id = request.user.sub
    const generate = new ShortUniqueId({ length: 6 })
    const generatedCode = String(generate()).toUpperCase()
    const poolCreateUseCase = new PoolCreateUseCase()
    let isUserLogged = false

    if (await request.jwtVerify()) {
      isUserLogged = true
    }

    const code = await poolCreateUseCase.execute({
      user_id,
      title,
      code: generatedCode,
      isUserLogged
    })

    return response.status(201).send({ code })
  }

  public async create (request: FastifyRequest, response: FastifyReply) {
    const { code } = poolJoinBody.parse(request.body)
    const id = request.user.sub
    const poolJoinUseCase = new PoolJoinUseCase()
    await poolJoinUseCase.execute({
      id,
      code
    })

    return response.status(201).send()
  }
}
