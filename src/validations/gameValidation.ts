import { z } from 'zod'

export const getGameParams = z.object({
  id: z.string()
})
