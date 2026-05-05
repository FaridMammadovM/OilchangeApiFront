import React from 'react'
import { CustomerCarService } from '../data/schema'

export type CustomerCarServicesDialogType = 'add' | 'edit' | 'delete'

interface CustomerCarServicesContextType {
  open: CustomerCarServicesDialogType | null
  setOpen: (str: CustomerCarServicesDialogType | null) => void
  currentRow: CustomerCarService | null
  setCurrentRow: React.Dispatch<React.SetStateAction<CustomerCarService | null>>
}

const CustomerCarServicesContext = React.createContext<CustomerCarServicesContextType | null>(null)

interface Props {
  children: React.ReactNode
  value: CustomerCarServicesContextType
}

export default function CustomerCarServicesContextProvider({ children, value }: Props) {
  return <CustomerCarServicesContext.Provider value={value}>{children}</CustomerCarServicesContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCustomerCarServicesContext = () => {
  const customerCarServicesContext = React.useContext(CustomerCarServicesContext)

  if (!customerCarServicesContext) {
    throw new Error(
      'useCustomerCarServicesContext has to be used within <CustomerCarServicesContext.Provider>'
    )
  }

  return customerCarServicesContext
}
