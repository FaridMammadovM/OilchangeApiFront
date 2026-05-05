import React from 'react'
import { Liquid } from '../data/schema'

export type LiquidsDialogType = 'add' | 'edit' | 'delete'

interface LiquidsContextType {
  open: LiquidsDialogType | null
  setOpen: (str: LiquidsDialogType | null) => void
  currentRow: Liquid | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Liquid | null>>
}

const LiquidsContext = React.createContext<LiquidsContextType | null>(null)

interface Props {
  children: React.ReactNode
  value: LiquidsContextType
}

export default function LiquidsContextProvider({ children, value }: Props) {
  return <LiquidsContext.Provider value={value}>{children}</LiquidsContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLiquidsContext = () => {
  const liquidsContext = React.useContext(LiquidsContext)

  if (!liquidsContext) {
    throw new Error(
      'useLiquidsContext has to be used within <LiquidsContext.Provider>'
    )
  }

  return liquidsContext
}
