import { useContext, createContext } from 'react'

export interface SignInCredentials {
  username: string
  password: string
}

interface Wallet {
  balance: number
  courtesy: number
}

interface AuthContextData {
  user: {
    id: string
    name: string
    username: string
    document: string
    role: string
    wallet: {
      balance: number
      courtesy: number
    }
    token: string
  }
  isAuthenticated: boolean
  signIn: (credentials: SignInCredentials) => Promise<void>
  updateWallet: (wallet: Wallet) => Promise<void>
  findBalance(): Promise<void>
  signOut: () => void
}

export const AuthContext = createContext({} as AuthContextData)

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}
