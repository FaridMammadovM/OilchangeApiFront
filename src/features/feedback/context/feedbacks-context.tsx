import React from 'react'
import { Feedback } from '../data/schema'

export type FeedbacksDialogType = 'add' | 'edit' | 'delete' | 'view'

interface FeedbacksContextType {
  open: FeedbacksDialogType | null
  setOpen: (str: FeedbacksDialogType | null) => void
  currentRow: Feedback | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Feedback | null>>
}

const FeedbacksContext = React.createContext<FeedbacksContextType | null>(null)

interface Props {
  children: React.ReactNode
  value: FeedbacksContextType
}

export default function FeedbacksContextProvider({ children, value }: Props) {
  return <FeedbacksContext.Provider value={value}>{children}</FeedbacksContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFeedbacksContext = () => {
  const feedbacksContext = React.useContext(FeedbacksContext)

  if (!feedbacksContext) {
    throw new Error(
      'useFeedbacksContext has to be used within <FeedbacksContext.Provider>'
    )
  }

  return feedbacksContext
}
