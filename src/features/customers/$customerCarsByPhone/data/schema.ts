import { z } from 'zod'

const customerCarSchema = z.object({
  id: z.number().optional(),
  carId: z.number(),
  customerId: z.number(),
  carNumber: z.string(),
  model: z.string(),
  brand: z.string(),
})
export type CustomerCar = z.infer<typeof customerCarSchema>

export const customerCarListSchema = z.array(customerCarSchema)
