import { z } from 'zod'

const envSchema = z.object({
  APP_URL: z.url(),
})

export const env = envSchema.parse({
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://colors.sayad.dev',
})
