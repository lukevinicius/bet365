import { useCompany } from '@/hooks/useCompany'
import { api } from '@/services/api/axios'
import { useToast } from '@chakra-ui/react'
import { redirect } from 'react-router-dom'
import { destroyCookie, setCookie } from 'nookies'
import { ReactNode, useEffect, useState } from 'react'

import { AuthContext, SignInCredentials } from '../hooks/useAuth'

interface AuthProviderProps {
  children: ReactNode
}

interface User {
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

export function AuthProvider({ children }: AuthProviderProps) {
  const toast = useToast()
  const { company } = useCompany()
  const [user, setUser] = useState<User>({} as User)
  const userStorageKey = `@${company.name}:user`
  const isAuthenticated = !!user

  async function signIn(credentials: SignInCredentials) {
    try {
      const { data } = await api.post('/sessions', {
        ...credentials,
        companyId: company.id,
      })
      const userLogged = {
        id: data.user.id,
        name: data.user.name,
        username: data.user.username,
        document: data.user.document,
        role: data.user.role,
        wallet: {
          balance: data.user.wallet.balance,
          courtesy: data.user.wallet.courtesy,
        },
        token: data.token,
      }
      setUser(userLogged)

      setCookie(undefined, `@${company.name}.token`, data.token)
      await sessionStorage.setItem(userStorageKey, JSON.stringify(userLogged))

      toast({
        title: 'Bem vindo',
        description: `Olá ${userLogged.name}!`,
        status: 'success',
        position: 'top',
        duration: 5000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Erro ao fazer login',
        description: `Verifique suas credenciais!`,
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  async function signOut() {
    destroyCookie(undefined, `@${company.name}.token`)
    await sessionStorage.removeItem(userStorageKey)
    setUser({} as User)
    setUser({
      wallet: {
        balance: 0,
        courtesy: 0,
      },
    } as User)

    redirect('/home')
  }

  async function findBalance() {}

  useEffect(() => {
    async function loadUserStorageDate() {
      const userStoraged = await sessionStorage.getItem(userStorageKey)

      if (userStoraged) {
        const userLogged = JSON.parse(userStoraged) as User
        // api.defaults.headers.Authorization = `Bearer ${userLogged.token}`
        await setUser(userLogged)
      }
    }

    loadUserStorageDate()
  }, [userStorageKey])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        findBalance,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
