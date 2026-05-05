import { z } from 'zod'

const serviceSchema = z.object({
  id: z.number(),
  customersServicesMatrixId: z.number(),
  serviceId: z.number(),
  serviceName: z.string(),
  changeDate: z.string(),
  carNumber: z.string(),
  phone: z.string(),
  customersCarsMatrixId: z.number()
})
export type Service = z.infer<typeof serviceSchema>

export interface IServicesData {
  items: Service[];
  haveNext: boolean;
}

export const serviceListSchema = z.array(serviceSchema)
