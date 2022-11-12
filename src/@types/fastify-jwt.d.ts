import '@fastify/jwt'

declare module '@fastify/jwt' {
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-unused-vars
  interface FastifyJWT {
    user: {
      name: string,
      avatarUrl: string,
      sub: string
    }
  }
}
