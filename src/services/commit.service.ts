import { Feedback } from "@/features/feedback/data/schema";
import request from "@/utils/axios";

export const getAllFeedbacks = async () => {
  const res = await request.get('/commit/getAllCommit')
  return res.data.data as Feedback[]
}

export const getFeedbackById = async (customerId: string) => {
  const res = await request.get('/commit/getCommit', { params: { customerId } })
  return res.data.data as Feedback
}