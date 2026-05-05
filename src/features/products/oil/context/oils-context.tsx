import React from 'react'
import { Oil } from '../data/schema'

export type OilsDialogType = 'add' | 'edit' | 'delete'

interface OilsContextType {
  open: OilsDialogType | null
  setOpen: (str: OilsDialogType | null) => void
  currentRow: Oil | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Oil | null>>
}

const OilsContext = React.createContext<OilsContextType | null>(null)

interface Props {
  children: React.ReactNode
  value: OilsContextType
}

export default function OilsContextProvider({ children, value }: Props) {
  return <OilsContext.Provider value={value}>{children}</OilsContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useOilsContext = () => {
  const oilsContext = React.useContext(OilsContext)

  if (!oilsContext) {
    throw new Error(
      'useOilsContext has to be used within <OilsContext.Provider>'
    )
  }

  return oilsContext
}
