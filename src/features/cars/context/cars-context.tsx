import React from 'react'
import { Car } from '../data/schema'

export type CarsDialogType = 'add' | 'edit' | 'delete'

interface CarsContextType {
  open: CarsDialogType | null
  setOpen: (str: CarsDialogType | null) => void
  currentRow: Car | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Car | null>>
}

const CarsContext = React.createContext<CarsContextType | null>(null)

interface Props {
  children: React.ReactNode
  value: CarsContextType
}

export default function CarsContextProvider({ children, value }: Props) {
  return <CarsContext.Provider value={value}>{children}</CarsContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCarsContext = () => {
  const carsContext = React.useContext(CarsContext)

  if (!carsContext) {
    throw new Error(
      'useCarsContext has to be used within <CarsContext.Provider>'
    )
  }

  return carsContext
}
