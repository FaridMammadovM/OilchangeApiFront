import React from 'react'
import { CustomerCar } from '../data/schema'

export type CustomerCarsDialogType = 'add' | 'edit' | 'delete'

interface CustomerCarsContextType {
  open: CustomerCarsDialogType | null
  setOpen: (str: CustomerCarsDialogType | null) => void
  currentRow: CustomerCar | null
  setCurrentRow: React.Dispatch<React.SetStateAction<CustomerCar | null>>
}

const CustomerCarsContext = React.createContext<CustomerCarsContextType | null>(null)

interface Props {
  children: React.ReactNode
  value: CustomerCarsContextType
}

export default function CustomerCarsContextProvider({ children, value }: Props) {
  return <CustomerCarsContext.Provider value={value}>{children}</CustomerCarsContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCustomerCarsContext = () => {
  const carsContext = React.useContext(CustomerCarsContext)

  if (!carsContext) {
    throw new Error(
      'useCustomerCarsContext has to be used within <CustomerCarsContext.Provider>'
    )
  }

  return carsContext
}
