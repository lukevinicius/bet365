import { useContext, createContext } from 'react'

interface LanguageContextData {
  language: {
    name: string
    code: string
    flag: string
  }
  changeLanguage(): Promise<void>
}

export const LanguageContext = createContext({} as LanguageContextData)

export function useLanguage() {
  const context = useContext(LanguageContext)

  return context
}
