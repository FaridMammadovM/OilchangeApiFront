import { Car } from "@/features/cars/data/schema";
import { ICar } from "@/types/car.type";
import { TApi } from "@/types/common.type";
import request from "@/utils/axios";

export const getCars = async () => {
  const res = await request.get('/cars/getCars')
  return res.data.data as ICar[]
}

export const getCarById = async (carId: string) => {
  const res = await request.get('/cars/getCarsById', { params: { carId } })
  return res.data.data as Car
}

export const addCar = async (body: Car) => {
  const res = await request.post('/cars/addCar', body);
  return res.data as TApi;
}

export const updateCar = async (body: Car) => {
  const res = await request.post('/cars/updateCar', body);
  return res.data as TApi;
}

export const deleteCar = async (carId: number) => {
  const res = await request.delete('/cars/deleteCar', { params: { carId } })
  return res.data as TApi;
}
