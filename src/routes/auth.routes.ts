import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'

import { createUserBody, userInfoSchema } from '../validations/userValidation'
import { prisma } from '../services/prisma'
import { authenticate } from '../plugins/authenticate'

export const authRoutes = async (fastify: FastifyInstance) => {
  fastify.get(
    '/me',
    { onRequest: [authenticate] },
    async (request: FastifyRequest, response: FastifyReply) => {
      return { user: request.user }
    })

  fastify.post('/users', async (request: FastifyRequest, response: FastifyReply) => {
    const { access_token } = createUserBody.parse(request.body)
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
    const userData = await userResponse.json()
    const userInfo = userInfoSchema.parse(userData)

    let user = await prisma.user.findUnique({
      where: {
        googleId: userInfo.id
      }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          googleId: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          avatarUrl: userInfo.picture
        }
      })
    }

    const token = fastify.jwt.sign({
      name: user.name,
      avatarUrl: user.avatarUrl
    }, {
      sub: user.id,
      expiresIn: '7 days'
    })

    return { token }
  })
}
