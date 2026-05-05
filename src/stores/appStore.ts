import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface Types {
  carNumber: string
  resetCarNumber: () => void
  setCarNumber: (carNumber: string) => void
}

const initialState = {
  carNumber: '',
}

export const useAppStore = create<Types>()(devtools(
  persist(
    (set) => ({
      ...initialState,
      resetCarNumber: () =>
        set((state) => ({ ...state, carNumber: '' })),
      setCarNumber: (carNumber) =>
        set((state) => ({ ...state, carNumber })),
    }),
    {
      name: 'app'
    }
  )
))

export const useAppState = () => useAppStore((state) => state)
