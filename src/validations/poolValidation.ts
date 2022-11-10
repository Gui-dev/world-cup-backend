import { z } from 'zod'

export const createPoolBody = z.object({
  title: z.string()
})
