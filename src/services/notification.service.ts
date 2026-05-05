import request from "@/utils/axios";

export const getThreeMonthNotification = async () => {
  const response = await request.get('/notification/threeMonthNotification')
  return response.data
}

export const getSixMonthNotification = async () => {
  const response = await request.get('/notification/sixMonthNotification')
  return response.data
}