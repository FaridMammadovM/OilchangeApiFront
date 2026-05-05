import { Employee } from "@/features/employee/data/schema";
import { TApi } from "@/types/common.type";
import request from "@/utils/axios";

export const getEmployees = async () => {
  const response = await request.get('/employee/getEmployees')
  return response.data.data as Employee[]
}

export const addEmployee = async (body: Employee) => {
  const response = await request.post('/employee/addEmployee', body)
  return response.data as TApi
}

export const updateEmployee = async (body: Employee) => {
  const response = await request.post('/employee/updateEmployee', body)
  return response.data as TApi
}

export const deleteEmployee = async (id: number) => {
  const response = await request.delete('/employee/deleteEmployee', { params: { id } })
  return response.data as TApi
}