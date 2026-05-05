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