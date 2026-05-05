import { z } from 'zod'

const liquidSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
})
export type Liquid = z.infer<typeof liquidSchema>

export const liquidListSchema = z.array(liquidSchema)
