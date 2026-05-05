import React from 'react'
import { Service } from '../data/schema'

export type ServicesDialogType = 'add' | 'edit' | 'delete'

interface ServicesContextType {
  open: ServicesDialogType | null
  setOpen: (str: ServicesDialogType | null) => void
  currentRow: Service | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Service | null>>
}

const ServicesContext = React.createContext<ServicesContextType | null>(null)

interface Props {
  children: React.ReactNode
  value: ServicesContextType
}

export default function ServicesContextProvider({ children, value }: Props) {
  return <ServicesContext.Provider value={value}>{children}</ServicesContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useServicesContext = () => {
  const servicesContext = React.useContext(ServicesContext)

  if (!servicesContext) {
    throw new Error(
      'useServicesContext has to be used within <ServicesContext.Provider>'
    )
  }

  return servicesContext
}
