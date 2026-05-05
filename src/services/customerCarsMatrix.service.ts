import { CustomerCarForm } from "@/features/customers/$customerCarsByPhone/components/customer-cars-action-dialog";
import { CustomerCar } from "@/features/customers/$customerCarsByPhone/data/schema";
import { TApi } from "@/types/common.type";
import request from "@/utils/axios";

export const getCustomerCarsMatrix = async (phone: string) => {
  const response = await request.get('/customersCarsMatrix/getCustomersCarsWithPhone', { params: { phone } })
  return response.data.data as CustomerCar[]
}

export const addCustomerCarsMatrix = async (body: CustomerCarForm) => {
  const response = await request.post('/customersCarsMatrix/addCustomersCarsMatrix', body)
  return response.data as TApi
}

export const updateCustomerCarsMatrix = async (body: CustomerCarForm) => {
  const res = await request.post('/customersCarsMatrix/updateCustomersCarsMatrix', body);
  return res.data as TApi;
}

export const deleteCustomerCarsMatrix = async (id: number) => {
  const res = await request.delete('/customersCarsMatrix/deleteCustomersCarsMatrix', { params: { id } });
  return res.data as TApi;
}