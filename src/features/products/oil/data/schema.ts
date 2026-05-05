import { z } from 'zod'

const oilSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
})
export type Oil = z.infer<typeof oilSchema>

export const oilListSchema = z.array(oilSchema)
