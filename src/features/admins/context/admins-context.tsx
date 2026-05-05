import React from 'react'
import { Admin } from '../data/schema'

export type AdminsDialogType = 'add' | 'edit' | 'delete'

interface AdminsContextType {
  open: AdminsDialogType | null
  setOpen: (str: AdminsDialogType | null) => void
  currentRow: Admin | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Admin | null>>
}

const AdminsContext = React.createContext<AdminsContextType | null>(null)

interface Props {
  children: React.ReactNode
  value: AdminsContextType
}

export default function AdminsContextProvider({ children, value }: Props) {
  return <AdminsContext.Provider value={value}>{children}</AdminsContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAdminsContext = () => {
  const adminsContext = React.useContext(AdminsContext)

  if (!adminsContext) {
    throw new Error(
      'useAdminsContext has to be used within <AdminsContext.Provider>'
    )
  }

  return adminsContext
}
