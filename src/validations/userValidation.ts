import { z } from 'zod'

export const createUserBody = z.object({
  access_token: z.string()
})

export const userInfoSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  picture: z.string().url()
})
