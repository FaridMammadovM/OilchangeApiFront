import { z } from 'zod'

const adminSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  surname: z.string(),
  username: z.string(),
})
export type Admin = z.infer<typeof adminSchema>

export const adminListSchema = z.array(adminSchema)
