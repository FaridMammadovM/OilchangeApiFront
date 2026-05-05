import { z } from 'zod'

const employeeSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  surname: z.string(),
  description: z.string(),
})
export type Employee = z.infer<typeof employeeSchema>

export const employeeListSchema = z.array(employeeSchema)
