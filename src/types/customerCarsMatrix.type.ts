export interface ICustomerCarsMatrixBody {
  id?: string,
  carId: string,
  customerId: string,
  carNumber: string,
  motorId: string,
  year: string,
  colorsId: string,
  fuelTypeId: string,
  description: string
}

export interface ICustomerCar {
  id: string,
  model: string,
  brand: string,
}
