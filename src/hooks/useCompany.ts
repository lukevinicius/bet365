import { useContext, createContext } from 'react'

interface CompanyContextData {
  company: {
    id: string
    name: string
    logo: string
    cnpj: string
    shieldTeams: {
      image?: string
      link?: string
    }[]
    banners: {
      image: string
      link: string
    }[]
    institutional: {
      instagram?: string
      youtube?: string
      facebook?: string
      twitch?: string
      tiktok?: string
      twitter?: string
      telegram?: string
      whatsapp?: string
    }
  }
  findCompany(domain: string): Promise<void>
}

export const CompanyContext = createContext({} as CompanyContextData)

export function useCompany() {
  const context = useContext(CompanyContext)

  return context
}
