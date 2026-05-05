import { Antifreeze } from "@/features/products/antifreeze/data/schema";
import { Liquid } from "@/features/products/liquid/data/schema";
import { Oil } from "@/features/products/oil/data/schema";
import { TApi } from "@/types/common.type";
import request from "@/utils/axios";

// Oils
export const getOils = async () => {
  const response = await request.get('/product/getOils')
  return response.data.data as Oil[]
}

export const addOil = async (body: Oil) => {
  const response = await request.post('/product/addOil', body)
  return response.data as TApi
}

export const updateOil = async (body: Oil) => {
  const response = await request.post('/product/updateOil', body)
  return response.data as TApi
}

export const deleteOil = async (producId: number) => {
  const response = await request.delete('/product/deleteOil', { params: { producId } })
  return response.data as TApi
}

// Antifreezes
export const getAntifreezes = async () => {
  const response = await request.get('/product/getAntifirizs')
  return response.data.data || [] as Antifreeze[]
}

export const addAntifreeze = async (body: Antifreeze) => {
  const response = await request.post('/product/addAntifiriz', body)
  return response.data as TApi
}

export const updateAntifreeze = async (body: Antifreeze) => {
  const response = await request.post('/product/updateAntifiriz', body)
  return response.data as TApi
}

export const deleteAntifreeze = async (producId: number) => {
  const response = await request.delete('/product/deleteAntifiriz', { params: { producId } })
  return response.data as TApi
}

// Liquids
export const getLiquids = async () => {
  const response = await request.get('/product/getLiquid')
  return response.data.data || [] as Liquid[]
}

export const addLiquid = async (body: Liquid) => {
  const response = await request.post('/product/addLiquid', body)
  return response.data as TApi
}

export const updateLiquid = async (body: Liquid) => {
  const response = await request.post('/product/updateLiquid', body)
  return response.data as TApi
}

export const deleteLiquid = async (producId: number) => {
  const response = await request.delete('/product/deleteLiquid', { params: { producId } })
  return response.data as TApi
}