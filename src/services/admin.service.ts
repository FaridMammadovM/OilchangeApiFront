import { Admin } from "@/features/admins/data/schema";
import { ResponseType, TApi } from "@/types/common.type";
import request from "@/utils/axios";

export const getAdmins = async () => {
  const res = await request.get('/customers/getAdmins')
  return res.data.data as Admin[]
}

export const getAdminByUsername = async (username: string) => {
  const res = await request.get('/customers/getAdminByUsername', { params: { username } })
  return res.data as ResponseType<Admin>
}

export const addAdmin = async (body: Admin) => {
  const response = await request.post('/customers/addAdmin', body)
  return response.data as TApi
}

export const updateAdmin = async (body: Admin) => {
  const res = await request.post('/customers/updateAdmin', body);
  return res.data as TApi;
}

export const deleteAdmin = async (adminId: number) => {
  const res = await request.delete('/cars/deleteAdmin', { params: { adminId } })
  return res.data as TApi;
}