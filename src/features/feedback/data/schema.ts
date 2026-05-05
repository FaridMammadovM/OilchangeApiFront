import { z } from 'zod'

const feedbackSchema = z.object({
  id: z.number().optional(),
  customerId: z.string(),
  name: z.string(),
  surname: z.string(),
  phone: z.string(),
  commitMessage: z.string(),
  isRequest: z.boolean(),
  insertedDate: z.string()
})
export type Feedback = z.infer<typeof feedbackSchema>

export const feedbackListSchema = z.array(feedbackSchema)
