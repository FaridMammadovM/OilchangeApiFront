import { z } from 'zod'

const antifreezeSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
})
export type Antifreeze = z.infer<typeof antifreezeSchema>

export const antifreezeListSchema = z.array(antifreezeSchema)
