import { ReactNode, useEffect, useState } from 'react'

import { CompanyContext } from '@/hooks/useCompany'
import { api } from '@/services/api/axios'
import { setCookie } from 'nookies'

interface CompanyProviderProps {
  children: ReactNode
}

interface Company {
  id: string
  name: string
  logo: string
  cnpj: string
  shieldTeams: {
    image: string
    link: string
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

export function CompanyProvider({ children }: CompanyProviderProps) {
  const [company, setCompany] = useState<Company>({} as Company)

  async function findCompany() {
    const { data } = await api.get('/company/by-domain')

    const companyData = {
      id: data.id,
      name: data.name,
      logo: data.logo,
      cnpj: data.cnpj,
      banners: data.banners,
      shieldTeams: data.shieldTeams,
      institutional: data.institutional,
    }

    setCookie(undefined, '@companyId', companyData.id)

    setCompany(companyData)
  }

  useEffect(() => {
    if (company.id === undefined) {
      findCompany()
    }
  }, [company.id])

  return (
    <CompanyContext.Provider
      value={{
        company,
        findCompany,
      }}
    >
      {children}
    </CompanyContext.Provider>
  )
}
