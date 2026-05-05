import { z } from 'zod'

const customerCarServiceSchema = z.object({
  id: z.number().optional(),
  customersCarsMatrixId: z.number(),
  serviceId: z.number(),
  serviceName: z.string(),
  changeDate: z.string(),
})
export type CustomerCarService = z.infer<typeof customerCarServiceSchema>

export const customerCarServiceListSchema = z.array(customerCarServiceSchema)
