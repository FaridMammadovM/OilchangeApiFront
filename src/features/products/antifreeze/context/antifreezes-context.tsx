import React from 'react'
import { Antifreeze } from '../data/schema'

export type AntifreezesDialogType = 'add' | 'edit' | 'delete'

interface AntifreezesContextType {
  open: AntifreezesDialogType | null
  setOpen: (str: AntifreezesDialogType | null) => void
  currentRow: Antifreeze | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Antifreeze | null>>
}

const AntifreezesContext = React.createContext<AntifreezesContextType | null>(null)

interface Props {
  children: React.ReactNode
  value: AntifreezesContextType
}

export default function AntifreezesContextProvider({ children, value }: Props) {
  return <AntifreezesContext.Provider value={value}>{children}</AntifreezesContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAntifreezesContext = () => {
  const antifreezesContext = React.useContext(AntifreezesContext)

  if (!antifreezesContext) {
    throw new Error(
      'useAntifreezesContext has to be used within <AntifreezesContext.Provider>'
    )
  }

  return antifreezesContext
}
