import request from "@/utils/axios";

export const getFuelTypes = async () => {
  const response = await request.get('/parametric/getFuelTypes')
  return response.data.data as { id: number, name: string }[]
}

export const getColors = async () => {
  const response = await request.get('/parametric/getColors')
  return response.data.data as { id: number, name: string }[]
}

export const getServices = async () => {
  const response = await request.get('/parametric/getServices')
  const data = response.data.data;
  [data[0], data[1]] = [data[1], data[0]]
  return data as { id: number, name: string }[]
}

export const getFilters = async () => {
  const response = await request.get('/parametric/getFilters')
  return response.data.data as { id: number, name: string }[]
}

export const getSAEViscosities = async () => {
  const response = await request.get('/parametric/getSAEViscosities')
  return response.data.data as { id: number, grade: string }[]
}

export const getWinterViscosities = async () => {
  const response = await request.get('/parametric/getWinterViscosities')
  return response.data.data as { id: number, grade: number }[]
}

export const getDOTs = async () => {
  const response = await request.get('/parametric/getDOTs')
  return response.data.data as { id: number, grade: string }[]
}

export const getMotors = async () => {
  const response = await request.get('/parametric/getMotors')
  return response.data.data as { id: number, engineCapacity: string }[]
}

export const getG = async () => {
  const response = await request.get('/parametric/getG')
  return response.data.data as { id: number, grade: string }[]
}