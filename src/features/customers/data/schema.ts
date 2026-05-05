import { z } from 'zod'

const customerSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  surname: z.string(),
  phone: z.string(),
  password: z.string().transform((pwd) => pwd.trim()).optional(),
  customersCars: z.array(z.object({
    carNumber: z.string(),
  })).optional()
})
export type Customer = z.infer<typeof customerSchema>

export const customerListSchema = z.array(customerSchema)
