import { z } from 'zod'

const carSchema = z.object({
  id: z.number().optional(),
  brand: z.string(),
  model: z.string(),
})
export type Car = z.infer<typeof carSchema>

export const carListSchema = z.array(carSchema)
