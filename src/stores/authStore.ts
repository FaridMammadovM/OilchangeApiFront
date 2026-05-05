import { Admin } from '@/features/admins/data/schema'
import { ITokens } from '@/types/auth.type'
import { redirect } from '@tanstack/react-router'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface IAuthState extends ITokens {
  user: Admin | null
  accessToken: string | null,
  refreshToken: string | null,
  refreshTokenExpiryTime: string | null,
  setUser: (user: Admin | null) => void
  setTokens: (tokens: ITokens) => void
  resetTokens: () => void
  resetAuth: () => void
}

const initialState: ITokens & Pick<IAuthState, 'user'> = {
  user: null,
  accessToken: null,
  refreshToken: null,
  refreshTokenExpiryTime: null,
}

export const useAuthStore = create<IAuthState>()(devtools(
  persist(
    (set) => ({
      ...initialState,
      setUser: (user) =>
        set((state) => ({ ...state, user })),
      setTokens: (tokens) =>
        set((state) => ({ ...state, ...tokens })),
      resetTokens: () => set((state) => ({
        ...state, accessToken: null,
        refreshToken: null,
        refreshTokenExpiryTime: null
      })),
      resetAuth: () => {
        set(initialState)
        throw redirect({ to: '/sign-in' })
    
      }
    }),
    {
      name: 'auth'
    }
  )
))

export const useAuth = () => useAuthStore((state) => state)
export const useGetUser = () => useAuthStore((state) => state.user)
