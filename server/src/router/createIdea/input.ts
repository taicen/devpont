import { z } from 'zod'

export const zCreateIdeaInput = z.object({
  name: z.string().min(1),
  nick: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+$/, 'Nick is invalid format'),
  description: z.string().min(1),
  text: z.string().min(100, 'Text is too short'),
})
