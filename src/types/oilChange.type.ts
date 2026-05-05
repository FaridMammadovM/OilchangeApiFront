import { ICar } from "./car.type"

export interface IOilChange {
  id: string,
  customersCarsMatrixId: string,
  serviceId: string,
  serviceName: string,
  changeDate: string
}

export type TFilter = {
  filterId: number,
  filterOwn: boolean,
  filterCode: string
}

export interface IOilChangePost {
  id?: number,
  customersCarsMatrixId: number,
  serviceId: string,
  productId: string,
  saeViscosityId: string,
  winterViscosityId: string,
  changeDate: Date,
  kilometersTravelled: string,
  oilVolume: string,
  duration: string,
  employeeId: string,
  branchId: string,
  price: string,
  oilOwn: boolean,
  oilCode: string,
  description: string,
  filters: TFilter[]
}

export interface IOilChangeById {
  id: number,
  branchId: number,
  branchName: number,
  changeDate: string,
  customersCarsMatrixId: number,
  description: string,
  duration: number,
  employeeId: number,
  employeeName: string,
  filters: TFilter[]
  indicator: string,
  kilometersTravelled: number,
  oilCode: string,
  oilOwn: boolean,
  volume: number,
  general: string,
  price: number,
  productId: number,
  productName: string,
  saeViscosityId: number
  saeViscosity: string,
  winterViscosityId: number
  winterViscosity: string,
  serviceId: EServices,
  serviceName: string,
}

export enum EServices {
  "Sürətlər qutusu" = 1,
  "Mühərrik" = 2,
  "Antifriz" = 3,
  "Əyləc mayesi" = 4,
  "Arxa körpü" = 5,
  "Ön körpü" = 6,
  "Diferensial (Razdatka)" = 7,
  "Sükan mayesi" = 10,
}

export type TLastOilChange = IOilChange & Pick<ICar, 'model' | 'brand'>
export interface IFilterParams {
  name: string,
  surname: string,
  branchId: string,
  carNumber: string,
  serviceId: string,
  productId: string,
  phone: string,
  changeDate: string,
  pageIndex:number,
  pageCount:number
}