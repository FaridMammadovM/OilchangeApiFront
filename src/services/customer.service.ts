import { Customer } from "@/features/customers/data/schema";
import { IAuthResponse, IUser } from "@/types/auth.type";
import { ResponseType, TApi } from "@/types/common.type";
import { IOTPBody } from "@/types/customer.type";
import { IFilterParams } from "@/types/oilChange.type";
import request from "@/utils/axios";

export const getCustomers = async (params: Partial<IFilterParams>) => {
  const res = await request.get('/customers/getCustomers', { params })
  return res.data.data as Customer[]
}

export const getCustomerById = async (phone: string) => {
  const res = await request.get('/customers/getCustomerById', { params: { phone } })
  return res.data as ResponseType<IUser>
}

export const addCustomer = async (body: Customer) => {
  const response = await request.post('/customers/addCustomer', body)
  return response.data as TApi
}

export const updateCustomer = async (body: Omit<Customer, 'password'>) => {
  const response = await request.post('/customers/updateCustomer', body)
  return response.data as TApi
}

export const changeCustomerPassword = async (body: Pick<Customer, 'id' | 'password'>) => {
  const response = await request.post('/customers/changePasswordWithAdmin', body)
  return response.data as TApi
}

export const deleteCustomer = async (phone: string) => {
  const res = await request.delete('/customers/deleteCustomer', { params: { phone } })
  return res.data as TApi;
}

export const verifyOtp = async (body: IOTPBody) => {
  const res = await request.post('/customers/verifyOtp', body);
  return res.data as TApi;
}

export const checkToken = async (refreshToken: string) => {
  const res = await request.post('/customers/checkToken', refreshToken);
  return res.data as IAuthResponse;
}

export const logout = async (body: string) => {
  const res = await request.post('/customers/logout', body);
  return res.data as TApi;
}


export const getUsernameRole = async () => {
  const res = await request.get('/customers/GetUsernameRole')
  return res.data.data as number
}