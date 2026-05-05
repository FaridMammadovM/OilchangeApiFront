import { CustomerCarServiceForm } from "@/features/customers/$customerCarsByPhone/$customerCarId/components/customer-car-services-action-dialog";
import { CustomerCarService } from "@/features/customers/$customerCarsByPhone/$customerCarId/data/schema";
import { IServicesData } from "@/features/dashboard/data/schema";
import { TApi } from "@/types/common.type";
import { IFilterParams, IOilChangeById, TLastOilChange } from "@/types/oilChange.type";
import request from "@/utils/axios";

export const getAllOilChanges = async (customersCarsMatrixId: string) => {
  const response = await request.get('/oilChange/getAllOilChanges', { params: { customersCarsMatrixId } })
  return response.data.data as CustomerCarService[]
}

export const getAllOilChangesAdmin = async (params: Partial<IFilterParams>) => {
  const response = await request.get('/OilChange/V3GetOilChanges', { params })
  return response.data.data as IServicesData
}

export const getLastOilChange = async (phone: string) => {
  const response = await request.get('/oilChange/getLastOilChange', { params: { phone } })
  return response.data as TLastOilChange[]
}

export const getOilChangeById = async (oilChangeId: number) => {
  const response = await request.get('/oilChange/getOilChangeById', { params: { oilChangeId } })
  return response.data.data as IOilChangeById
}

export const addOilChange = async (body: CustomerCarServiceForm) => {
  const response = await request.post('/oilChange/addOilChange', body)
  return response.data as TApi
}

export const updateOilChange = async (body: CustomerCarServiceForm) => {
  const response = await request.post('/oilChange/updateOilChange', body)
  return response.data as TApi
}

export const deleteOilChange = async (id: number) => {
  const response = await request.delete('/oilChange/deleteOilChange', { params: { id } })
  return response.data as TApi
}