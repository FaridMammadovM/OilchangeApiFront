export interface IEmployee {
  id: string
  name: string
  surname: string
  fullname: string
}

export type IEmployeePost = Pick<IEmployee, 'name' | 'surname'>
export type IEmployeePut = Pick<IEmployee, 'id' | 'name' | 'surname'>