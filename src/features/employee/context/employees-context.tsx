import React from 'react'
import { Employee } from '../data/schema'

export type EmployeesDialogType = 'add' | 'edit' | 'delete' | 'edit-password'

interface EmployeesContextType {
  open: EmployeesDialogType | null
  setOpen: (str: EmployeesDialogType | null) => void
  currentRow: Employee | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Employee | null>>
}

const EmployeesContext = React.createContext<EmployeesContextType | null>(null)

interface Props {
  children: React.ReactNode
  value: EmployeesContextType
}

export default function EmployeesContextProvider({ children, value }: Props) {
  return <EmployeesContext.Provider value={value}>{children}</EmployeesContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useEmployeesContext = () => {
  const employeesContext = React.useContext(EmployeesContext)

  if (!employeesContext) {
    throw new Error(
      'useEmployeesContext has to be used within <EmployeesContext.Provider>'
    )
  }

  return employeesContext
}
