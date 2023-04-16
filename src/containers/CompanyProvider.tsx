import { ReactNode, useEffect, useState } from 'react'

import { CompanyContext } from '@/hooks/useCompany'
import { api } from '@/services/api/axios'
import { setCookie } from 'nookies'
import { ICompany } from '@/domain/interfaces/ICompany'

interface CompanyProviderProps {
  children: ReactNode
}

export function CompanyProvider({ children }: CompanyProviderProps) {
  const [company, setCompany] = useState<ICompany>({} as ICompany)

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
      bestLeagues: data.leaguesConfig,
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
