import React from 'react'
import { Customer } from '../data/schema'

export type CustomersDialogType = 'add' | 'edit' | 'delete' | 'edit-password'

interface CustomersContextType {
  open: CustomersDialogType | null
  setOpen: (str: CustomersDialogType | null) => void
  currentRow: Customer | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Customer | null>>
}

const CustomersContext = React.createContext<CustomersContextType | null>(null)

interface Props {
  children: React.ReactNode
  value: CustomersContextType
}

export default function CustomersContextProvider({ children, value }: Props) {
  return <CustomersContext.Provider value={value}>{children}</CustomersContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCustomersContext = () => {
  const customersContext = React.useContext(CustomersContext)

  if (!customersContext) {
    throw new Error(
      'useCustomersContext has to be used within <CustomersContext.Provider>'
    )
  }

  return customersContext
}
