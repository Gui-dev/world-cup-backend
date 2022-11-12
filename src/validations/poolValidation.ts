import { z } from 'zod'

export const createPoolBody = z.object({
  title: z.string()
})

export const poolJoinBody = z.object({
  code: z.string()
})

export const getPoolParams = z.object({
  id: z.string()
})
