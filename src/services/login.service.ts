import { UserAuth } from "@/features/auth/sign-in/components/user-auth-form";
import { IAuthResponse } from "@/types/auth.type";
import request from "@/utils/axios";

export const login = async (data: UserAuth) => {
  const response = await request.post('/customers/adminLogin', data)
  return response.data.data as IAuthResponse
}