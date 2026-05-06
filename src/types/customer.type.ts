export interface ICustomer {
  id: string
  name: string
  surname: string
  phone: string
}

export interface IAddCustomer extends Omit<ICustomer, 'id'> {
  password: string,
}

export interface IChangeCustomerPassword {
  customerId: string
  password: string
}

export type IUpdateAdmin = ICustomer
export type IAddAdmin = IAddCustomer

export interface IOTPBody {
  phone: string
  otpCode: string
}

export interface ICustomerFilters {
  name?: string
  surname?: string
  carNumber?: string
  phone?: string
  pageIndex: number
  pageCount: number
  sortByDateAscending: boolean
}

export interface ICustomerApiFilters {
  PageIndex: number
  PageCount: number
  CarNumber?: string
  Name?: string
  Surname?: string
  Phone?: string
  SortByDateAscending: boolean
}

export interface IGetCustomersV2Response<T = ICustomer> {
  items: T[]
  haveNext: boolean
  dataCount: number
  totalCount: number
}