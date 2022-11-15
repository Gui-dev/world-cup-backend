import { z } from 'zod'

export const createGuessBody = z.object({
  firstTeamPoints: z.number(),
  secondTeamPoints: z.number()
})

export const createGuessParams = z.object({
  poolId: z.string(),
  gameId: z.string()
})
